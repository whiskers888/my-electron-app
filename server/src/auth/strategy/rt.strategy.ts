import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt-payload.interfaces';
import { UserService } from '../../user/user.service';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(
		config: ConfigService,
		private readonly userService: UserService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					const data = request?.get('cookie')?.split('JWT_Refresh_Token=')[1];
					if (!data) {
						return null;
					}

					return data;
				}
			]),
			secretOrKey: config.get<string>('JWT_REFRESH_TOKEN_SECRET'),
			passReqToCallback: true,
			ignoreExpiration: false
		});
	}

	async validate(req: Request, payload: JwtPayload) {
		// const refreshToken = req?.get('authorization')?.replace('Bearer', '').trim();

		const refreshToken = req?.get('cookie')?.split('JWT_Refresh_Token=')[1];
		if (!refreshToken) throw new HttpException('Рефреш токен отсутсвует', HttpStatus.UNAUTHORIZED);

		const user = await this.userService.getById(payload.userId);
		if (user.token !== refreshToken)
			throw new HttpException('Рефреш токен не совпадает. Пройдите авторизацию', HttpStatus.UNAUTHORIZED);

		return {
			...payload,
			refreshToken
		};
	}
}
