import { EntitySchema } from '@app/shared/entities/entity-schema';
import { Column } from 'typeorm';

export class StoredFile extends EntitySchema {
  @Column()
  title?: string;

  @Column()
  uri: string;
}
