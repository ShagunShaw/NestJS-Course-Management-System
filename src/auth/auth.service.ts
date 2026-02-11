import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService)  {}

    registerUser() {
        /**
         * Steps are: 
         * 1) Check if user already exists
         * 2) hash the password
         * 3) store the user into db
         * 4) generate JWT token
         * 5) send token in response
         */
        const result= this.userService.createUser()
        return result;
    }
}
