import { Usuario } from "src/usuario/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Lenguaje {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:true})
    name:string;
    @Column({nullable:true})
    level:string;


    @ManyToOne(() => Usuario, (user_id) => user_id.lenguajes, {eager: true,onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user_id:Usuario;
}
