import { Usuario } from 'src/usuario/entities/user.entity';
import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, JoinColumn} from 'typeorm';


@Entity()
@Unique(['name', 'user_id'])
export class SocialNetwork {

    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:false})
    name:string;

    @Column({nullable:false,unique:true})
    link:string;


    @ManyToOne(() => Usuario, (user_id) => user_id.socials, {eager: true,onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user_id:Usuario;


}

