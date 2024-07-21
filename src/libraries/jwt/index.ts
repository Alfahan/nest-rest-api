import { Algorithm } from 'jsonwebtoken';
import { JWT_EXPIRATION_TIME, JWT_KEY, JWT_REFRESH_EXPIRATION_TIME, JWT_REFRESH_SECRET } from 'src/consts';
import { JwtService } from '@nestjs/jwt';

export default class JWTOKEN {
	static JWT_ALGORITHM: Algorithm = 'HS512';

	/**
     * generateAccessToken
     * @param payload 
     * @returns 
     */
	generateAccessToken(payload: any){
		return this.generateToken(payload, JWT_KEY, JWT_EXPIRATION_TIME);
	}
    
	/**
     * generateRefreshToken
     * @param payload 
     * @returns 
     */
	generateRefreshToken(payload: any){
		return this.generateToken(payload, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRATION_TIME);
	}

	/**
     * generateToken
     * @param payload 
     * @param secret 
     * @param expiresIn 
     * @returns 
     */
	generateToken(payload: any, secret: string, expiresIn: string) {
		return new JwtService().sign(payload, {
			secret: secret,
			algorithm: JWTOKEN.JWT_ALGORITHM,
			expiresIn: expiresIn 
		});
	}

	/**
     * verifyAccessToken
     * @param token 
     * @returns 
     */
	verifyAccessToken(token: string){
		return this.verifyToken(token, JWT_KEY);
	}

	/**
     * verifyRefreshToken
     * @param refreshToken 
     * @returns 
     */
	verifyRefreshToken(refreshToken: string){
		return this.verifyToken(refreshToken, JWT_REFRESH_SECRET);
	}

	/**
     * Verify Access Token Ignore Expiry
     * @param token 
     * @returns 
     */
	verifyAccessTokenIgnoreExpiry(token: string){
		try {
			return new JwtService().verify(token, {
				secret: JWT_KEY,
				algorithms: [JWTOKEN.JWT_ALGORITHM],
				ignoreExpiration: true,
			});
		} catch (e) {
			return null;
		}
	}
    
	/**
     * Verify Token
     * @param token 
     * @param secret 
     * @returns 
     */
	verifyToken(token: string, secret: string): any{
		try {
			return new JwtService().verify(token, {secret, algorithms: [JWTOKEN.JWT_ALGORITHM]});
		} catch (e) {
			return null;
		}
	}


	/**
     * Verify Token
     * @param token 
     * @param secret 
     * @returns 
     */
	jwtDecode(token: string): any {
		try {
			return new JwtService().decode(token);
		} catch (e) {
			return null;
		}
	}

	/**
     * Generate token payload
     * @param user 
     * @param token 
     * @param refresh_token 
     * @returns 
     */
	tokenPayload(user: any) {
		return {
			user_id: user.id,
			name: user.full_name,
			email: user.email,
			avatar: user.avatar,
			role_id: user.role_id,
			role: user.role,
			division_id: user.division_id,
			unit_id: user.unit_id,
		}
	}

	/**
     * Generate refresh token payload
     * @param user 
     * @returns 
     */
	tokenRefreshPayload(user: any){
		return {
			user_id: user.id
		}
	}
}