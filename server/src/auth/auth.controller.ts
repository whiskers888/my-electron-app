import { Body, Controller, Get, Headers, HttpCode, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from 'src/dto/user.dto';
import { OutputAuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService
	) {}

	@Post('sign-up')
	async registration(
		@Headers() headers: Headers,
		@Body() userModel: CreateUserDto,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService
			.signUp(userModel, String(headers['user-agent']))
			.then(data => {
				this.setCookie(data.token, res).send({
					user: data.user,
					token: data.token
				});
			})
			.catch(error => {
				throw new HttpException(String(error), HttpStatus.BAD_REQUEST);
			});
	}

	@Post('sign-in')
	async login(
		@Headers() headers: Headers,
		@Body() userModel: CreateUserDto,
		@Res({ passthrough: true }) res: Response
	) {
		console.log('1');
		return this.authService
			.signIn(userModel, String(headers['user-agent']))
			.then(data => {
				this.setCookie(data.tokens, res).send({
					user: data.user,
					token: data.tokens
				});
			})
			.catch(error => {
				throw new HttpException(String(error), HttpStatus.BAD_REQUEST);
			});
	}

	@Get('/logout')
	logout(@Res() res) {
		this.purge(res).send({
			msg: true
		});
	}

	setCookie(token: string, res: Response) {
		return res.cookie('Token', token, {
			httpOnly: true,
			// secure: true,
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
		});
	}

	purge(res: Response) {
		return res.cookie('Token', '', {
			httpOnly: true,
			// secure: true,
			expires: new Date(0)
		});
	}
}
