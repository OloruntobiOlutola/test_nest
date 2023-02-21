import {
  Controller,
  Get,
  HttpCode,
  Redirect,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ForbiddenException } from './forbidden.exception';
import { LoggingInterceptor } from './logging.interceptor';

@Controller('home')
@UseInterceptors(LoggingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('http://localhost:3000/home', 302)
  getHelloWorld() {
    return { url: 'http://localhost:3000/home/hello' };
  }

  @Get('hello')
  @HttpCode(200)
  getHello(): { message: string } {
    // throw new ForbiddenException();
    return this.appService.getHello();
  }
}
