export interface JwtPayload {
	userId: number;
	username: string;
	userAgent: string;
	iat: number;
	exp: number;
}
