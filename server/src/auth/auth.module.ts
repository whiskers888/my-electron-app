import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RtStrategy } from './strategy/rt.strategy';

@Module({
	controllers: [AuthController],
	imports: [UserModule, PassportModule, JwtModule.register({})],
	providers: [AuthService, RtStrategy],
	exports: [AuthService]
})
export class AuthModule {}
