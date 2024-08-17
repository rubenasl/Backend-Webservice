import { Category } from 'src/category/entities/category.entity';
import { Usuario } from 'src/usuario/entities/user.entity';
import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, JoinColumn} from 'typeorm';


@Entity()
export class Resume {

    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:true})
    titleImpt:string;
    @Column({nullable:true})
    titleSecondary:string;
    @Column({nullable:true, type:"timestamp without time zone"})
    date_init:string;
    @Column({nullable:true, type:"timestamp without time zone"})
    date_end:string;
    @Column({nullable:true,type:'varchar'})
    description:string;
    @Column({nullable:true})
    country:string;
    @Column({nullable:true})
    link:string;
    @Column({nullable:true,type:'varchar'})
    city:string;
    @Column({nullable:true})
    subtitle:string;
    

    @ManyToOne(() => Usuario, (user_id) => user_id.resumes, {eager: true,onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user_id:Usuario;


    @ManyToOne(() => Category, (cat) => cat.resumes, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'category_id' })
    category_id: Category;
}
