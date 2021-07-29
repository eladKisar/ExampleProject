import { IsEmail, IsEnum, Length } from "class-validator";
import { Entity, Column, OneToMany} from "typeorm";
import Model from './Model';
import  Post  from './Post';

enum RoleType {
    USER = 'user',
    ADMIN = 'admin',
    SUPER_ADMIN ='superAdmin'
}

@Entity("users")
export default class User extends Model {

    @Column()
    @Length(1,255)
    userName: string;

    @Column()
    @Length(1,255)
    @IsEmail()
    userEmail: string;

    @Column()
    @IsEnum(RoleType)
    userRole: RoleType;

    @OneToMany(type => Post, post => post.user) // note: we will create author property in the Photo class below
    posts: Post[];

    constructor(model?: Partial<User>) {
        super()
        Object.assign(this, model)
    }
}
