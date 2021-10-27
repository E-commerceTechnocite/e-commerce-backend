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

    const metaphoneQuery = `%${query.split(' ').map(metaphone).join(' ')}%`;

    const SQLQuery = repository.createQueryBuilder('p');
    fields.forEach((field) => {
      switch (field.type) {
        case 'metaphone':
          SQLQuery.addSelect(
            `p.${field.name} LIKE :metaphone`,
            `rel_${field.name}`,
          );
          break;
        case 'default':
        default:
          SQLQuery.addSelect(
            `MATCH (p.${field.name}) AGAINST (:query)`,
            `rel_${field.name}`,
          );
      }
    });
    const fulltexts = fields.filter((f) => f.type === 'default' || !f.type);
    const metaphones = fields.filter((f) => f.type === 'metaphone');

    SQLQuery.where(
      `MATCH(${fulltexts
        .map((f) => `p.${f.name}`)
        .join(', ')}) AGAINST (:query IN BOOLEAN MODE)`,
    );
    metaphones.forEach((f) => {
      SQLQuery.orWhere(`p.${f.name} LIKE :metaphone`);
    });
    SQLQuery.setParameters({
      query,
      metaphone: metaphoneQuery,
    });

    const order = [];
    for (let i = fields.length - 1; i >= 0; i--) {
      order.push(`(rel_${fields[i].name} * POWER(2, ${i}))`);
    }
    SQLQuery.orderBy(order.join('+'), 'DESC');

    return SQLQuery;
  }
}
