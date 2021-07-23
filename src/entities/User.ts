import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { formatDate } from '../utils/formatDate';

@Entity('users')
export class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

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
