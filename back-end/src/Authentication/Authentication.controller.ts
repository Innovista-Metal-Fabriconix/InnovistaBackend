import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  Param,
  Query,
  Put,
} from "@nestjs/common";

import { AuthenticationService } from "./Authentication.service";
import { AuthDTO } from "./DTO/Authentication.DTO";

@Controller("auth")
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post("register")
  async register(@Body() authDto: AuthDTO) {
    return this.authService.register(authDto);
  }
}