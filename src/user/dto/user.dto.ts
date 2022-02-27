import { ApiProperty } from "@nestjs/swagger";
import { IsString, Min } from "class-validator";

export class UserDto{
    @ApiProperty({example: 'user@email.com', description: 'User email'})
    @IsString()
    @Min(5)
    u_email: string;

    @ApiProperty({example: 'T1zx2$fa0Vm#', description: 'User password'})
    @IsString()
    @Min(5)
    u_password: string;
}