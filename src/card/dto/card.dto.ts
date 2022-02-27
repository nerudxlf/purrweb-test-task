import { ApiProperty } from "@nestjs/swagger";
import { IsString, Min, Max  } from "class-validator";

export class CardDto{
    @ApiProperty({example: 'Card', description: 'Card name'})
    @IsString()
    @Min(4)
    @Max(32)
    c_name: string;
    
    @ApiProperty({example: 'Card description', description: 'Card description'})
    @IsString()
    @Max(256)
    c_description: string;

    @ApiProperty({example: 'Result', description: 'Card result'})
    @IsString()
    @Min(4)
    @Max(32)
    c_result: string;
}