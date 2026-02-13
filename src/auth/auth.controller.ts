import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')         // Here 'auth' is my prefix and all routes of this controller will start from 'auth/'
export class AuthController {
    // authService: AuthService
    // constructor(authService: AuthService)    {  this.authService= authService  }

    constructor(private readonly authService: AuthService,
                private readonly userService: UserService
            ) {}

    @Post('register')       // so now our final route will be '/auth/register'
    async register(@Body() registerUserDto: RegisterDto) {       // Dto stands for 'Data Transfer Object'
        const createdUser= await this.authService.registerUser(registerUserDto);
        return createdUser;
    }

    @Post("login")
    async login() {
        // To be done

        /**
         * 1) Receive email and password
         * 2) Math the email and password in the database
         * 3) Generate JWT Token
         * 4) Set the token in the frontend, both in register() and login()
         */
    }

    @UseGuards(AuthGuard)       //Now this is our middleware.
    @Get('profile')
    async getProfile(@Request() req) {
        const user= req.user;       // Since 'user' is now explicityly instilled in request by us
        const userId= user.sub;

        const result= await this.userService.getUserById(userId)

        return result;
  }
}
