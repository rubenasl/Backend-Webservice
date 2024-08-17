
import { Usuario } from 'src/usuario/entities/user.entity';
import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, JoinColumn} from 'typeorm';


@Entity()
@Unique(['title', 'user_id'])
export class Section {

    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:false})
    title:string;

    @Column({nullable:false,type:'varchar'})
    description:string;

    @ManyToOne(() => Usuario, (user_id) => user_id.sections, {eager: true,onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user_id:Usuario;
    


}

