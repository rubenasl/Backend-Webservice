import { Usuario } from 'src/usuario/entities/user.entity';
import { ProjectIMG } from '../../project-img/entities/project-img.entity';
import { Skill } from '../../skill/entities/skill.entity';
import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, JoinColumn, JoinTable, ManyToMany} from 'typeorm';


@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:true})
    name:string;
    @Column({nullable:true})
    category:string;
    @Column({nullable:true})
    client:string;
    @Column({nullable:true, type:"timestamp without time zone"})
    dateProject:string;
    @Column({nullable:true, type:'varchar'})
    description:string;
    @Column({nullable:true})
    url:string;


    @ManyToMany(() => Skill, { eager: true })
    @JoinTable({
      name: 'project_skills',
      joinColumn: {
        name: 'project_id',
        referencedColumnName: 'id'
      },
      inverseJoinColumn: {
        name: 'skill_id',
        referencedColumnName: 'id'
      }
    })
    skills: Skill[];


    @OneToMany(() => ProjectIMG, (prosImg) => prosImg.project_id)
    prosImgs: ProjectIMG[];

    @ManyToOne(() => Usuario, (user_id) => user_id.projects, {eager: true,onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user_id:Usuario;

}
