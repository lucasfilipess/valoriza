import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { formatDate } from '../utils/formatDate';

@Entity('tags')
export class Tag {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'nameCustom' })
  nameCustom(): string {
    return `#${this.name}`;
  }

  @Expose({ name: 'formattedCreateDate' })
  formattedCreateDate(): string {
    return formatDate(this.created_at);
  }

  @Expose({ name: 'formattedUpdateDate' })
  formattedUpdateDate(): string {
    return formatDate(this.created_at);
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
