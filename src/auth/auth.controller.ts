import { Body, Controller, HttpCode, HttpStatus, Inject, Post, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthService } from "./providers/auth.service";
import { SignInDto, } from "./dtos/sigin.dtos";


@Controller('auth')
export class AuthController {
    constructor(
        /**
         * Inject authService
         */
        private readonly authService: AuthService,

    ) { }

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    public async signIng(@Body() signInDto: SignInDto) {
        return await this.authService.signIng(signInDto)
    }
}