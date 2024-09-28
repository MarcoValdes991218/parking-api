import { Injectable } from "@nestjs/common";

import { SignInDto } from "../dtos/sigin.dtos";
import { SignInProvider } from "./sigin.provider";



@Injectable()
export class AuthService {
    constructor(
        /**
         * Inject sigInProvider
         */
        private readonly signInProvider: SignInProvider
    ) { }
    public async signIng(signInDto: SignInDto) {
        return await this.signInProvider.signIn(signInDto)
    }
}

