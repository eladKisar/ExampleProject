import { Entity, Column, ManyToOne } from 'typeorm';
import Model from './Model'
import {User} from './User';

@Entity("posts")
export class Post extends Model {

    @Column()
    title: string;

    @Column() 
    body: string;

    @ManyToOne(type => User, user => user.posts) // note: we will create author property in the Photo class below
    user: User;

    constructor(model?: Partial<Post>) {
        super()
        Object.assign(this, model)
    }
}
