import { Usuario } from 'src/usuario/entities/user.entity';
import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, JoinColumn} from 'typeorm';


@Entity()
export class Services {

    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:false,unique:true})
    name:string;
    @Column({nullable:false,type:'varchar'})
    description:string;
    @Column({ nullable: true})
    icon: string;


    @ManyToOne(() => Usuario, (user_id) => user_id.services, {eager: true,onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user_id:Usuario;


}
