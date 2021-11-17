import { GenericRepository } from '@app/shared/repositories/generic.repository';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { mock, mockFn } from 'jest-mock-extended';
import { Connection, EntityMetadata, SelectQueryBuilder } from 'typeorm';
import { TableMetadataArgs } from 'typeorm/metadata-args/TableMetadataArgs';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';

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
    // beforeEach(() => {
    //   jest.clearAllMocks();
    // });
    const qb = mock<SelectQueryBuilder<Stub>>({
      skip: mockFn().mockReturnThis(),
      take: mockFn().mockReturnThis(),
      orderBy: mockFn().mockReturnThis(),
    });
    Object.defineProperty(qb, 'alias', { get: () => 'entity' });
    repo.createQueryBuilder = jest.fn().mockReturnValue(qb);
    repo.count = jest.fn().mockResolvedValue(10);
    const entityMetadata = new EntityMetadata({
      connection: connectionMock,
      args: argsMock,
    });
    entityMetadata.eagerRelations = [];
    Object.defineProperty(repo, 'metadata', { get: () => entityMetadata });

    it('should return paginated data', async () => {
      const result = await repo.findAndPaginate(1, 10);

      expect(result).toBeInstanceOf(PaginationDto);
      expect(qb.orderBy).toHaveBeenCalledWith(`${qb.alias}.createdAt`, 'DESC');
    });

    it('should order by the provided options', async () => {
      const result = await repo.findAndPaginate(1, 10, {
        order: 'ASC',
        orderBy: 'updatedAt',
      });

      expect(result).toBeInstanceOf(PaginationDto);
      expect(qb.orderBy).toHaveBeenCalledWith(`${qb.alias}.updatedAt`, 'ASC');
    });
  });
});
