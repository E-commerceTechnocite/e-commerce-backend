import { Repository, SelectQueryBuilder } from 'typeorm';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';
import { Field, Joins } from '@app/shared/services/mysql-search-engine.service';
import * as metaphone from 'talisman/phonetics/metaphone';
import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PaginationOptions } from '@app/shared/interfaces/paginator.interface';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';

export abstract class GenericRepository<T> extends Repository<T> {
  createSearchQuery(
    alias: string,
    query: string,
    fields: Field[],
    joins?: Joins,
  ): SelectQueryBuilder<T> {
    if (!query) {
      throw new RuntimeException('No query string provided');
    }
    try {
      const qb = this.createQueryBuilder(alias);
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
        qb.leftJoinAndSelect(k, v);
      });

      console.log(this.metadata.indices);

      const fulltexts = fields.filter((f) => f.type === 'default' || !f.type);
      const metaphones = fields.filter((f) => f.type === 'metaphone');

      if (fulltexts.length > 0) {
        qb.where(
          `MATCH(${fulltexts
            .map((f) => `${qb.alias}.${f.name}`)
            .join(', ')}) AGAINST (:query IN BOOLEAN MODE)`,
        );
      }
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
      return qb;
    } catch {
      throw new RuntimeException('Incorrect query');
    }
  }

  async findAndPaginate(
    index: number,
    limit: number,
    opts: PaginationOptions = {},
  ): Promise<PaginationDto<T>> {
    opts = {
      loadEagerRelations: true,
      ...opts,
    };
    if (opts?.order && opts?.order !== 'DESC' && opts?.order !== 'ASC') {
      throw new BadRequestException(`Wrong 'order' parameter: '${opts.order}'`);
    }
    const count = await this.count();
    const meta = new PaginationMetadataDto(index, limit, count);
    if (meta.currentPage > meta.maxPages) {
      throw new NotFoundException('This page does not exist');
    }
    let relations: string[] = [];
    if (opts.loadEagerRelations) {
      relations = this.metadata.eagerRelations.map((rel) => {
        return rel.buildPropertyPath();
      });
    }

    const q = await this.createQueryBuilder('entity')
      .skip(index * limit - limit)
      .take(limit);

    let prop = opts?.orderBy ?? 'createdAt';
    prop = relations.includes(prop.split('.')[0]) ? prop : `${q.alias}.${prop}`;

    relations.forEach((rel) => {
      q.leftJoinAndSelect(`${q.alias}.${rel}`, rel);
    });
    let data;
    try {
      data = await q.orderBy(`${prop}`, opts?.order ?? 'DESC').getMany();
    } catch (err) {
      throw new BadRequestException(
        `Unknown 'orderBy' parameter: '${opts.orderBy}'`,
      );
    }

    return {
      data,
      meta,
    };
  }
}
