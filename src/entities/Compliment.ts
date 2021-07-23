import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { formatDate } from '../utils/formatDate';
import { Tag } from './Tag';
import { User } from './User';

@Entity('compliments')
export class Compliment {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_sender: string;

  @JoinColumn({ name: 'user_sender' })
  @ManyToOne(() => User)
  userSender: User;

  @Column()
  user_receiver: string;

  @JoinColumn({ name: 'user_receiver' })
  @ManyToOne(() => User)
  userReceiver: User;

  @Column()
  tag_id: string;

  @JoinColumn({ name: 'tag_id' })
  @ManyToOne(() => Tag)
  tag: Tag;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: 'formattedCreateDate' })
  formattedCreateDate(): string {
    return formatDate(this.created_at);
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
