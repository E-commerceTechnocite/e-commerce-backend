import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import * as metaphone from 'talisman/phonetics/metaphone';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

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
      throw new RuntimeException('No query string provided');
    }
    try {
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

      if (fulltexts.length > 0) {
        SQLQuery.where(
          `MATCH(${fulltexts
            .map((f) => `p.${f.name}`)
            .join(', ')}) AGAINST (:query IN BOOLEAN MODE)`,
        );
      }
      if (metaphones.length > 0) {
        SQLQuery.orWhere(
          `MATCH(${metaphones
            .map((f) => `p.${f.name}`)
            .join(', ')}) AGAINST (:metaphone IN BOOLEAN MODE)`,
        );
      }
      SQLQuery.setParameters({
        query,
        metaphone: metaphoneQuery,
      });

      const order = fields.map(
        (f, i, { length }) => `(rel_${f.name} * POWER(2, ${length - i}))`,
      );
      SQLQuery.orderBy(order.join('+'), 'DESC');

      return SQLQuery;
    } catch {
      throw new RuntimeException('Incorrect query');
    }
  }
}
