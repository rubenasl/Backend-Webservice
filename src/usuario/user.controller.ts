import { Controller, Get, Post, Headers, Body, Patch, Param, Delete, Query, UseGuards, UseInterceptors, UploadedFile, BadRequestException, UploadedFiles } from '@nestjs/common';
import { UsuarioService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginDto } from './dto/login.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { resetPassword } from './dto/password-reset.dto';
import { linkPassDto } from './dto/linkPass.dto';
import { changePasswordDto } from './dto/change-password.dto';
import { GetUser } from './get-user.decorator';
import { Usuario } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

import { ValidateTokenDto } from './dto/validate-token.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class UsuarioController {
  constructor(private readonly userService: UsuarioService) {}

  @Post('/register')

  async create(
    @Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @Post('/login')
  login(@Body() loginDto: loginDto):Promise<{accessToken:string}> {
    return this.userService.login(loginDto);
  }


  @Get('/activate')
  activate(@Query()ActivateUserDto:ActivateUserDto){
    return this.userService.activateUser(ActivateUserDto);
  }
  @Patch('/reset-pass')
  @UseGuards(JwtAuthGuard)
  resetPass(@Body()resetPassword:resetPassword){
    return this.userService.requestResetPass(resetPassword)
  }

  @Patch('/link-pass')
  @UseGuards(JwtAuthGuard)
  linkPass(@Body()linkPassDto:linkPassDto){
    return this.userService.linkPass(linkPassDto)
  }

  @Patch('/change-password')
  @UseGuards(JwtAuthGuard)
  changePassword(@Body()changePasswordDto:changePasswordDto,@GetUser()user:Usuario){
    return this.userService.changePass(changePasswordDto,user)
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('validate-token')
  async validateToken(@Headers() headers: ValidateTokenDto): Promise<{ valid: boolean }> {
    const token = this.extractToken(headers.authorization);
    const isValid = await this.userService.validateToken(token);
    return { valid: isValid };
  }

  private extractToken(authorization: string): string {
    if (!authorization) {
      throw new Error('Authorization header is missing');
    }
    const parts = authorization.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new Error('Authorization header format is "Bearer <token>"');
    }
    return parts[1];
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    return this.userService.getUser(username);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.Delete(id);
  }
}
