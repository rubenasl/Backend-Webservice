import { Usuario } from 'src/usuario/entities/user.entity';
import { Project } from '../../project/entities/project.entity';
import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, JoinColumn} from 'typeorm';


@Entity()
export class ProjectIMG {

    @PrimaryGeneratedColumn()
    id:number;
    @Column("text", { array: true, nullable: true })
    imgs: string[];
    @ManyToOne(() => Project, (project_id) => project_id.prosImgs, {eager: true,onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name: 'project_id'})
    project_id:Project;

    @ManyToOne(() => Usuario, (user_id) => user_id.projectIMGs, {eager: true,onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user_id:Usuario;

}
