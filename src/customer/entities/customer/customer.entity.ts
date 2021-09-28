
import { Type } from "class-transformer";
import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./customer.enum";
import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';
@Entity()
export class Customer  {
    @PrimaryGeneratedColumn() 
    id: string; 
    @Column()
    username: string;
    
    @Column()
    password: string;
    
    @Column()
    email: string;
    @Column()
    phoneNumber: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    gender: Gender;
   
    @Column({type:'date' })  
    birthDate: Date;
    @Column()
    newsletter: boolean;

}