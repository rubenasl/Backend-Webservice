import { Usuario } from 'src/usuario/entities/user.entity';
import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';



@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:true})
    name:string;


    @ManyToOne(() => Usuario, (user_id) => user_id.categories, {eager: true,onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user_id:Usuario;
    @OneToMany(() => Resume, (resume) => resume.category_id)
    resumes: Resume[];
}
