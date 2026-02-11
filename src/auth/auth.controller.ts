import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')         // Here 'auth' is my prefix and all routes of this controller will start from 'auth/'
export class AuthController {
    // authService: AuthService
    // constructor(authService: AuthService)    {  this.authService= authService  }

    constructor(private readonly authService: AuthService) {}

    @Post('register')       // so now our final route will be '/auth/register'
    register() {
        const result= this.authService.registerUser();
        return result;
    }
}
