
import { Usuario } from 'src/usuario/entities/user.entity';
import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, JoinColumn} from 'typeorm';


@Entity()
export class Section {

    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:false,unique:true})
    title:string;

    @Column({nullable:false,type:'varchar'})
    description:string;

    @ManyToOne(() => Usuario, (user_id) => user_id.sections, {eager: true,onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user_id:Usuario;
    


}

