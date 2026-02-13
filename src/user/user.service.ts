import { Model } from 'mongoose';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(registerUserDto: RegisterDto) {
        
        try 
        {
            const result= await this.userModel.create({
                fname: registerUserDto.fname,
                lname: registerUserDto.lname,
                email: registerUserDto.email,
                password: registerUserDto.password      // the original password had been overriden by the hashed password before it has been sent to this file 
            })
            return result;
        }
        catch (err: unknown)
        {
            const e= err as { code?: number };
            const DUPLICATE_KEY_ERROR_CODE= 11000;

            if(e.code == DUPLICATE_KEY_ERROR_CODE)    // yh ek baar error get kro, then you will get what the error code it sends
            {
                throw new ConflictException("Email is already taken");
                // here err.code only means that a duplicate value is taken on a variable where it is not supposed to be, but it does not specify on which attribute this error is being thrown. Here we are hardcoding it as we know explicitly that its 'email' attribute only, but we need to check it internally in code for which attribute the error is being thrown and then display the message accordingly.
            }

            throw err;
        }
    }
}
