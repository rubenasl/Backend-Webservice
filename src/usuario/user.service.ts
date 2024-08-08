import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { loginDto } from './dto/login.dto';
import { use } from 'passport';
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import {v4} from 'uuid'
import { ActivateUserDto } from './dto/activate-user.dto';
import { resetPassword } from './dto/password-reset.dto';
import { linkPassDto } from './dto/linkPass.dto';
import { changePasswordDto } from './dto/change-password.dto';
import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';


interface LoginResponse {
  accessToken: string;
  username: string;
  id: string;
}

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private UserRep:Repository<Usuario>,
    private jwtService:JwtService
)
{}
async findAll()
{
const users = this.UserRep.find();
return (await users).map(user => plainToClass(Usuario, user));
}

async getUser(username: string): Promise<Partial<Usuario>> {
  const user = await this.UserRep.findOne({
    where: { username },
    select: [
      'id',
      'firstName',
      'lastName',
      'phone',
      'birthday',
      'address',
      'degree',
      'freelancer',
      'remote',
      'profession',
      'email',
      'username',
      'experience',
      'level',
      'cvPathEn',
      'cvPathEs',
    ],
  });
  
  if (!user) {
    throw new NotFoundException(`User with username ${username} not found`);
  }

  return user;
}


async create(createUserDto: CreateUserDto): Promise<Usuario> {
  const { email, username, password, birthday } = createUserDto;

  // Verificación de campos requeridos
  if (!email || !username || !password) {
    throw new BadRequestException('Email, username, and password are required');
  }

  // Verificación de duplicados de correo electrónico
  const existingUserByEmail = await this.UserRep.findOneBy({ email });
  if (existingUserByEmail) {
    throw new ConflictException('Email is already in use');
  }

  // Verificación de duplicados de nombre de usuario
  const existingUserByUsername = await this.UserRep.findOneBy({ username });
  if (existingUserByUsername) {
    throw new ConflictException('Username is already in use');
  }

  // Hash de la contraseña
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  // Creación de la nueva instancia de usuario
  const newUser = this.UserRep.create({
    email,
    username,
    firstName: createUserDto.firstName,
    lastName: createUserDto.lastName,
    phone: createUserDto.phone,
    birthday: birthday ? birthday : null,
    address: createUserDto.address,
    degree: createUserDto.degree,
    freelancer: createUserDto.freelancer,
    remote: createUserDto.remote,
    profession: createUserDto.profession,
    level: createUserDto.level,
    experience: createUserDto.experience,
    password: hashedPassword,
    activationToken: v4(),
    cvPathEn: createUserDto.cvPathEn,
    cvPathEs: createUserDto.cvPathEs,
  });

  // Guardado del nuevo usuario en la base de datos
  return this.UserRep.save(newUser);
}


    
  


async update(id: string, body: UpdateUserDto) {
  const user = await this.UserRep.findOneBy({ id });
  if (!user) {
    throw new NotFoundException(`User with id ${id} not found`);
  }

  // Actualiza los campos booleanos explícitamente si están presentes en el cuerpo de la solicitud
  if (body.freelancer !== undefined) {
    user.freelancer = body.freelancer;
  }
  if (body.remote !== undefined) {
    user.remote = body.remote;
  }

  this.UserRep.merge(user, body);
  return this.UserRep.save(user);
}



async Delete(id: string) {
  const user = await this.UserRep.findOneBy({ id });
  if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
  }
  await this.UserRep.delete(id);
  return true;
}


async login(loginDto: loginDto): Promise<LoginResponse> {
  const { username, password } = loginDto;
  const user = await this.UserRep.findOneBy({ username });
  if (!user) {
    throw new UnauthorizedException('Revise las credenciales');
  } else {
    const hashedPassword = user.password;

    const comparacion = await bcrypt.compare(password, hashedPassword);

    if (comparacion) {
      const payload: JwtPayload = { id: user.id, username, active: user.active };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken, username, id: user.id };
    } else {
      throw new UnauthorizedException('Revise las credenciales');
    }
  }
}

async validateToken(token: string): Promise<boolean> {
  try {
    const decoded = this.jwtService.verify(token);
    // Aquí puedes añadir más lógica si necesitas verificar más cosas, como el estado del usuario
    return !!decoded;
  } catch (error) {
    // Puedes manejar diferentes errores aquí, por ejemplo, token expirado, token inválido, etc.
    throw new UnauthorizedException('Invalid token');
  }
}


async activateUser(ActivateUserDto:ActivateUserDto){
  const {id, code}=ActivateUserDto;
  const user= await this.UserRep.findOne({ where: { id, activationToken: code, active: false } });
  if (!user){
    throw new UnprocessableEntityException('No puede ejecutar esta accion')
  }
  else{
    user.active = true; // Actualizar el atributo active
    await this.UserRep.save(user); // Guardar los cambios en el repositorio
  }
}

async requestResetPass(resetPassword:resetPassword){
  const {username}=resetPassword;
  const user = await this.UserRep.findOneBy({ username });
  if (!user){
    throw new NotFoundException(`Usuario ${username} no encontrado`);
  }
  else{
    user.resetPass=v4();
    this.UserRep.save(user); // Guardar los cambios en el repositorio
  }
}
async linkPass(linkPassDto:linkPassDto){
  const {resetPasswordToken,password}=linkPassDto;
  const user= await this.UserRep.findOne({ where: {resetPass: resetPasswordToken} });
  if (!user){
    throw new NotFoundException();
  }
  else{

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password,salt);
    user.password= hashedPassword;
    user.resetPass=null;
    this.UserRep.save(user);

  }
}

async changePass(changePasswordDto:changePasswordDto,user:Usuario){
  const {old_pass, new_pass}=changePasswordDto;
  console.log(old_pass)
  const comparacion = await bcrypt.compare(old_pass, user.password);
  if(comparacion){
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(new_pass,salt);
    user.password= hashedPassword;
    this.UserRep.save(user);
  }
  else{
    throw new BadRequestException('Contraseña actual no coincide')
  }
}

}
