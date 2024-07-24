import { IsNotEmpty, IsOptional } from "class-validator";
import CryptoTs from "pii-agent-ts";

export class UpdateUserDto {
    @IsNotEmpty()
        id: string;

    @IsOptional()
        name: string;

    @IsOptional()  
        email: string;
    
    @IsOptional()
        address: string;
    
    @IsOptional()
        age: number;    
    
    @IsOptional()
        password: string;
}