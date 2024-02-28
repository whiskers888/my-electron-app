import { Injectable } from '@nestjs/common';
import { JwtPayload } from './middleware/jwt-payload.interface';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UserService,
		private readonly jwtService: JwtService
	) {}

	async signUp(userModel: CreateUserDto, ua: string) {
		const hasUser = await this.usersService.getByEmail(userModel.email);
		if (hasUser) throw new Error('Такой пользователь уже существует!');

		const user = await this.usersService.create(userModel);

		const token = await this.encodeToken(user.email, user.id, ua);
		return {
			user: {
				id: user.id,
				login: user.email
			},
			token
		};
	}

	async signIn(userModel: CreateUserDto, ua: string) {
		const user = await this.usersService.validateUser(userModel.email, userModel.password);
		if (!user) throw new Error('Введеный логин или пароль неверны');

		const tokens = await this.encodeToken(user.email, user.id, ua);
		return {
			user: {
				id: user.id,
				login: user.email
			},
			tokens
		};
	}

	async encodeToken(username: string, userId: number, userAgent: string) {
		const at = await this.jwtService.signAsync(
			{ username, userId, userAgent },
			{ expiresIn: '14d', secret: process.env.JWT_REFRESH_TOKEN_SECRET }
		);
		return at;
	}

	decodeToken(accessToken: string) {
		const base64Payload = accessToken.split('.')[1];
		const payloadBuffer = Buffer.from(base64Payload, 'base64');
		const updatedJwtPayload: JwtPayload = JSON.parse(payloadBuffer.toString()) as JwtPayload;
		return updatedJwtPayload;
	}
}
