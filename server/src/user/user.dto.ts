import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MD5 } from 'crypto-js';

/**
 * Модель DTO для создания данных
 */
export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	login: string;

	@IsString()
	@IsNotEmpty()
	@Transform(({ value }: { value: string }) => MD5(value).toString())
	password: string;
}

/**
 * Модель DTO для данных на обновление
 */
export class UpdateUserDto extends CreateUserDto {
	@IsNumber()
	@IsNotEmpty()
	id: number;
}

/**
 * Модель DTO для данных на выход
 */
export class OutputUserDto {
	id: number;
	login: string;
}
