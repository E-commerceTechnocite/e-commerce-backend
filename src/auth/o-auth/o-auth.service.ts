import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '@app/user/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OAuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async login(user: UserDto): Promise<string> {
    const userEntity = await this.userRepo.findOne({
      where: { username: user.username },
    });
    if (
      !userEntity ||
      !(await bcrypt.compare(user.password, userEntity.password))
    ) {
      throw new BadRequestException('Invalid Credentials');
    }
    const { id, username, email, role } = userEntity;
    console.log(role);
    return this.jwt.sign({ id, username, email, role });
  }
}
