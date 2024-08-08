import { Usuario } from 'src/usuario/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';

@Entity()
@Unique(['section', 'user_id'])
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  section: string;

  @Column({ nullable: true })
  imgs: string;

  @ManyToOne(() => Usuario, user => user.photos, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user_id: Usuario;
}
