import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, 
                private readonly jwtService: JwtService
            )  {}

    async registerUser(registerUserDto: RegisterDto) {
        /**
         * Steps are: 
         * 1) Check if user already exists
         * 2) hash the password
         * 3) store the user into db
         * 4) generate JWT token
         * 5) send token in response
         */

        const hashedPassword= await bcrypt.hash(registerUserDto.password, 10);

        const user= await this.userService.createUser({...registerUserDto, password: hashedPassword})
        
        const payload= {sub: user._id, role: 'admin'}       // only for testing purpose we had explicitly written 'roles: admin', but in real-time, we will take this info from the frontend only
        const token= await this.jwtService.signAsync(payload);

        return {access_token: token};
    }
}
