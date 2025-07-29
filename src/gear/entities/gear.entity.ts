import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IGear } from '../interfaces/gear.interfaces';

@Entity()
export class Gear implements IGear {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @Column({ unique: true })
  id: string;

  @Column()
  primary: boolean;

  @Column()
  name: string;

  @Column()
  distance: number;

  @Column({ nullable: true })
  brand?: string;

  @Column({ nullable: true })
  model?: string;

  @Column({ default: false })
  showNotifications: boolean;

  @Column({ nullable: true })
  notifyThreshold?: number;

  @Column()
  type: string;

  @Column()
  athleteId: string;

  @ManyToOne(() => User, (user) => user.athleteId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'athleteId', referencedColumnName: 'athleteId' })
  user: User;
}
