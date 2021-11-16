import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import * as metaphone from 'talisman/phonetics/metaphone';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

export interface Field {
  type?: 'metaphone' | 'default';
  name: string;
}

export type Joins = { [key: string]: string }[];

@Injectable()
export class MysqlSearchEngineService {
  createSearchQuery<T>(
    qb: SelectQueryBuilder<T>,
    query: string,
    fields: Field[],
    joins?: Joins,
  ): SelectQueryBuilder<T> {
    if (!query) {
      throw new RuntimeException('No query string provided');
    }
    try {
      const setParam = (f: Field) =>
        f.type === 'metaphone' ? ':metaphone' : ':query';
      const metaphoneQuery = query.split(' ').map(metaphone).join(' ');
      fields.forEach((f) => {
        qb.addSelect(
          `MATCH (${qb.alias}.${f.name}) AGAINST (${setParam(f)})`,
          `relevance_${f.name}`,
        ).distinct(false);
      });

      joins?.forEach((relation) => {
        const [[k, v]] = Object.entries(relation);
        console.log(`${k}`, v);
        qb.leftJoinAndSelect(`${k}`, `${v}`);
      });

      const fulltexts = fields.filter((f) => f.type === 'default' || !f.type);
      const metaphones = fields.filter((f) => f.type === 'metaphone');

      if (fulltexts.length > 0) {
        qb.where(
          `MATCH(${fulltexts
            .map((f) => `${qb.alias}.${f.name}`)
            .join(', ')}) AGAINST (:query IN BOOLEAN MODE)`,
        );
      }
      console.log({
        query,
        metaphone: metaphoneQuery,
      });
      if (metaphones.length > 0) {
        qb.orWhere(
          `MATCH(${metaphones
            .map((f) => `${qb.alias}.${f.name}`)
            .join(', ')}) AGAINST (:metaphone IN BOOLEAN MODE)`,
        );
      }
      qb.setParameters({
        query,
        metaphone: metaphoneQuery,
      });

      const order = fields.map(
        (f, i, { length }) => `(relevance_${f.name} * POWER(2, ${length - i}))`,
      );
      qb.orderBy(order.join('+'), 'DESC');
      // qb.execute().then(console.log).catch(console.log);
      console.log(qb.getQueryAndParameters());
      return qb;
    } catch {
      throw new RuntimeException('Incorrect query');
    }
  }
}
