import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { loginDto } from 'src/users/dto/login.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService) { }

    async validateUser(user: loginDto) {
        const foundUser = await this.prisma.user.findUnique({
            where: {
                email: user.email
            }
        });
        if (!foundUser) return null;
        const isPasswordValid = await (user.password, foundUser.password)

        if (isPasswordValid) {
            return this.jwtService.sign({
                id: foundUser.id,
                email: foundUser.email,
                role: foundUser.role,
            });

        } else {
            throw new UnauthorizedException('Creadenciales Invalidads')
        }
    }
}