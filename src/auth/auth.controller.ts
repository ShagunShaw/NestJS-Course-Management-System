import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';

@Controller('auth')         // Here 'auth' is my prefix and all routes of this controller will start from 'auth/'
export class AuthController {
    // authService: AuthService
    // constructor(authService: AuthService)    {  this.authService= authService  }

    constructor(private readonly authService: AuthService) {}

    @Post('register')       // so now our final route will be '/auth/register'
    async register(@Body() registerUserDto: RegisterDto) {       // Dto stands for 'Data Transfer Object'
        const createdUser= await this.authService.registerUser(registerUserDto);
        return createdUser;
    }
}
