import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import newUserDTO from './dto/newUser.dto';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Post('/create')
    public createNewUser(@Body() newUserDTO:newUserDTO){
        return this.userService.createNewUser(newUserDTO);
    }

    @Get('')
    public getAllUsers(){
        return this.userService.findAll();
    }

}
