import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { Lenguaje } from 'src/lenguajes/entities/lenguaje.entity';
import { Photo } from 'src/photo/entities/photo.entity';
import { Project } from 'src/project/entities/project.entity';
import { Resume } from 'src/resume/entities/resume.entity';
import { Section } from 'src/section/entities/section.entity';
import { Services } from 'src/services/entities/service.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { SocialNetwork } from 'src/social-network/entities/social-network.entity';
import { ProjectIMG } from 'src/project-img/entities/project-img.entity';
import { Exclude } from 'class-transformer';
import { Catch } from '@nestjs/common';
import { Category } from 'src/category/entities/category.entity';


@Entity()
export class Usuario {

    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column({nullable:true})
    firstName:string;
    @Column({nullable:true})
    lastName:string;
    @Column({nullable:true})
    phone:string;
    @Column({ nullable: true, type: "timestamp without time zone", default: () => 'CURRENT_DATE' })
    birthday: string;
    @Column({nullable:true})
    address:string;
    @Column({nullable:true})
    degree:string;
    @Column({nullable:true, default:false})
    freelancer:boolean;
    @Column({nullable:true, default:false})
    remote:boolean;
    @Column({nullable:true})
    profession:string;
    @Column({unique:true})
    email:string;
    @Column({unique:true})
    username:string;
    @Exclude()
    @Column({unique:false})
    password:string;
    @Exclude()
    @Column({type:'boolean', default:false})
    active:boolean
    @Exclude()
    @Column({type:'uuid', unique:true})
    activationToken:string;
    @Exclude()
    @Column({type:'uuid', unique:true, nullable:true})
    resetPass: string
    @Column({nullable:true})
    cvPathEs: string; // Ruta del archivo CV en español
    @Column({nullable:true})
    cvPathEn: string; // Ruta del archivo CV en inglés
    @Column({nullable:true})
    experience:string
    @Column({nullable:true})
    level:string;


 
    
    @OneToMany(() => Photo, (photo) => photo.user_id)
    photos: Photo[];

    @OneToMany(() => Category, (cat) => cat.user_id)
    categories: Category[];

    @OneToMany(() => Project, (project) => project.user_id)
    projects: Project[];

    @OneToMany(() => Resume, (resume) => resume.user_id)
    resumes: Resume[];

    @OneToMany(() => Section, (section) => section.user_id)
    sections: Section[];

    @OneToMany(() => Services, (service) => service.user_id)
    services: Services[];

    @OneToMany(() => Skill, (skill) => skill.user_id)
    skills: Skill[];

    @OneToMany(() => SocialNetwork, (social) => social.user_id)
    socials: SocialNetwork[];
    
    @OneToMany(() => ProjectIMG, (projectIMG) => projectIMG.user_id)
    projectIMGs: ProjectIMG[];


    @OneToMany(() => Lenguaje, (lenguaje) => lenguaje.user_id)
    lenguajes: Lenguaje[];
}
