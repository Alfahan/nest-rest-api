import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
        id: string;

    @IsNotEmpty()
        name: string;

    @IsNotEmpty()
        email: string;
    
    @IsNotEmpty()
        address: string;
    
    @IsOptional()
        age: number;    
    
    @IsNotEmpty()
        password: string;
}