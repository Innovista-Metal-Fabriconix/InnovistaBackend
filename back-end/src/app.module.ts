import { Module } from '@nestjs/common';
import { AuthenticationModule } from './Authentication/Authentication.module';


@Module({
  imports: [ AuthenticationModule],
})
export class AppModule {}
