import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';

@Injectable() // Injectable 데코레이터 사용 해 프로바이더로 지정
export class UsersService {
  constructor(private emailService: EmailService) {}

  async createUser(name: string, email: string, password: string) {
    await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private checkUserExists(email: string) {
    return false; // TODO: DB 연동 후 구현
  }

  private saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    return; // TODO: DB 연동 후 구현
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    // TODO
    // 1. DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 조회하고 없으면 에러
    // 2. 바로 로그인 상태가 되도록 JWT를 발급
    throw new Error('Method not implemented.');
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
