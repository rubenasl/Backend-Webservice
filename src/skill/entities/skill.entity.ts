import { Usuario } from 'src/usuario/entities/user.entity';
import { Project } from '../../project/entities/project.entity';
import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, JoinColumn, ManyToMany} from 'typeorm';


@Entity()
@Unique(['name', 'user_id'])
export class Skill {

    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:true,type:'float'})
    porcent:string;
    @Column({ nullable: true })
    icon: string;
    @Column({nullable:false})
    name:string;
    @ManyToMany(() => Project, (project) => project.skills)
    projects: Project[];
    @Column({nullable:true})
    group:string;

    @ManyToOne(() => Usuario, (user_id) => user_id.skills, {eager: true,onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user_id:Usuario;
}
