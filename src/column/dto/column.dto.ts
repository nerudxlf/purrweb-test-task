import { ApiProperty } from "@nestjs/swagger";
import { IsString, Min, Max  } from "class-validator";

export class ColumnDto{
    @ApiProperty({example: 'Column', description: 'Column name'})
    @IsString()
    @Min(4)
    @Max(32)
    c_name: string;

    @ApiProperty({example: 'Column description', description: 'Column description'})
    @IsString()
    @Max(256)
    c_description: string;
}