import { Injectable } from '@nestjs/common';
import { measureMemory } from 'vm';

@Injectable()
export class UserService {
    createUser() {
        return {message: "user created"};
    }
}
