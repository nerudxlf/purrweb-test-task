import { ApiProperty } from "@nestjs/swagger";
import { IsString, Min } from "class-validator";

export class AuthDto{
    @ApiProperty({example: 'user@email.com', description: 'User email'})
    @IsString()
    email: string;

    @ApiProperty({example: 'T1zx2$fa0Vm#', description: 'User password'})
    @IsString()
    password: string;
}