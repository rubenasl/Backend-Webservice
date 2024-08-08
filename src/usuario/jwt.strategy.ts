import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Usuario } from "./entities/user.entity";
import { Repository } from "typeorm/repository/Repository";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(Usuario) private UserRep:Repository<Usuario>
    ){
        super({
            secretOrKey:'super-secret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    async validate(payload:JwtPayload):Promise<Usuario>{
        const{username}=payload;
        const user = await this.UserRep.findOneBy({ username });
        if(!user){
            throw new UnauthorizedException();
        }
        else{return user}
    }
}