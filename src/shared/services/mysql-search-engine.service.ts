import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import * as metaphone from 'talisman/phonetics/metaphone';

export interface Field {
  type?: 'metaphone' | 'default';
  name: string;
}

@Injectable()
export class MysqlSearchEngineService {
  createSearchQuery<T>(
    repository: Repository<T>,
    query: string,
    fields: Field[],
  ): SelectQueryBuilder<T> {
    if (!query) {
      throw new Error('No query string provided');
    }
    const setParam = (f: Field) =>
      f.type === 'metaphone' ? ':metaphone' : ':query';
    const metaphoneQuery = query.split(' ').map(metaphone).join(' ');

    const SQLQuery = repository.createQueryBuilder('p');
    fields.forEach((f) => {
      SQLQuery.addSelect(
        `MATCH (p.${f.name}) AGAINST (${setParam(f)})`,
        `rel_${f.name}`,
      );
    });
    const fulltexts = fields.filter((f) => f.type === 'default' || !f.type);
    const metaphones = fields.filter((f) => f.type === 'metaphone');

    SQLQuery.where(
      `MATCH(${fulltexts
        .map((f) => `p.${f.name}`)
        .join(', ')}) AGAINST (:query IN BOOLEAN MODE)`,
    );
    SQLQuery.orWhere(
      `MATCH(${metaphones
        .map((f) => `p.${f.name}`)
        .join(', ')}) AGAINST (:metaphone IN BOOLEAN MODE)`,
    ).setParameters({
      query,
      metaphone: metaphoneQuery,
    });

    const order = fields.map(
      (f, i, { length }) => `(rel_${f.name} * POWER(2, ${length - i}))`,
    );
    SQLQuery.orderBy(order.join('+'), 'DESC');

    console.log(SQLQuery.getQueryAndParameters());

    return SQLQuery;
  }
}
