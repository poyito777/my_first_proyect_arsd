import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { loginDto } from 'src/users/dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController{
   
   constructor(private authService: AuthService){}
   
    @Post('login')
    async login(
        @Body() data: loginDto
    ){
        const usertoken = await this.authService.validateUser(data);
        
        if (!usertoken) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        
        return usertoken;
    }
}

