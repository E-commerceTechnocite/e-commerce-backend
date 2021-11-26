import { GenericRepository } from '@app/shared/repositories/generic.repository';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { mock, mockFn } from 'jest-mock-extended';
import { Connection, EntityMetadata, SelectQueryBuilder } from 'typeorm';
import { TableMetadataArgs } from 'typeorm/metadata-args/TableMetadataArgs';
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';

describe('GenericRepository', () => {
  class Stub extends EntitySchema {}

  class StubRepository extends GenericRepository<Stub> {}

  const repo = new StubRepository();

  const connectionMock = mock<Connection>();
  const argsMock = mock<TableMetadataArgs>();

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('findAndPaginate', () => {
    const qb = mock<SelectQueryBuilder<Stub>>({
      skip: mockFn().mockReturnThis(),
      take: mockFn().mockReturnThis(),
      orderBy: mockFn().mockReturnThis(),
      alias: 'entity',
    });
    repo.createQueryBuilder = jest.fn().mockReturnValue(qb);
    repo.count = jest.fn().mockResolvedValue(10);
    const entityMetadata = new EntityMetadata({
      connection: connectionMock,
      args: argsMock,
    });
    entityMetadata.eagerRelations = [];
    Object.defineProperty(repo, 'metadata', {
      get: () => entityMetadata,
      configurable: true,
    });

    beforeEach(() => {
      qb.leftJoinAndSelect.mockReset();
    });

    it('should return paginated data', async () => {
      const result = await repo.findAndPaginate(1, 10);

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
      expect(qb.orderBy).toHaveBeenCalledWith(`${qb.alias}.createdAt`, 'DESC');
      expect(qb.leftJoinAndSelect).toHaveBeenCalledTimes(0);
    });

    it('should order by the provided options', async () => {
      const result = await repo.findAndPaginate(1, 10, {
        order: 'ASC',
        orderBy: 'updatedAt',
      });

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
      expect(qb.orderBy).toHaveBeenCalledWith(`${qb.alias}.updatedAt`, 'ASC');
      expect(qb.leftJoinAndSelect).toHaveBeenCalledTimes(0);
    });

    it('should load eager relations by default', async () => {
      const relation = mock<RelationMetadata>({
        buildPropertyPath: mockFn().mockReturnValue('relation'),
      });
      entityMetadata.eagerRelations = [relation];

      const result = await repo.findAndPaginate(1, 10);

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
      expect(qb.orderBy).toHaveBeenCalledWith(`${qb.alias}.createdAt`, 'DESC');
      expect(qb.leftJoinAndSelect).toHaveBeenCalledTimes(1);
      expect(qb.leftJoinAndSelect).toHaveBeenCalledWith(
        `${qb.alias}.relation`,
        'relation',
      );
    });

    it('should not load eager relation if specified', async () => {
      const relation = mock<RelationMetadata>({
        buildPropertyPath: mockFn().mockReturnValue('relation'),
      });
      entityMetadata.eagerRelations = [relation];
      Object.defineProperty(repo, 'metadata', {
        get: () => entityMetadata,
        configurable: true,
      });

      const result = await repo.findAndPaginate(1, 10, {
        loadEagerRelations: false,
      });

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
      expect(qb.orderBy).toHaveBeenCalledWith(`${qb.alias}.createdAt`, 'DESC');
      expect(qb.leftJoinAndSelect).toHaveBeenCalledTimes(0);
    });
  });
});
