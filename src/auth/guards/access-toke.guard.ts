import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from '../constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {

    constructor(
        /**
         * Inject JwtService
         */
        private readonly jwtService: JwtService,

        /**
         * Inject JwtConfiguration
         */
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        // Extract the request from the execution context
        const request = context.switchToHttp().getRequest();
        // Extract the token from the header
        const token = this.extractRequestFromHeader(request)
        // validate the token
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, this.jwtConfiguration);

            request[REQUEST_USER_KEY] = payload
        } catch (error) {
            throw new UnauthorizedException()
        }

        return true;
    }

    private extractRequestFromHeader(request: Request): string | undefined {
        const [_, token] = request.headers.authorization?.split(" ") ?? [];
        return token;
    }
}
