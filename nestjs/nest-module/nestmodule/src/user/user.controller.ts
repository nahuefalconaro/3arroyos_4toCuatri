import { Controller, Get } from "@nestjs/common";

@Controller("user")
export class UserController {
  // Define your controller methods here

  @Get()
  getUser() {
    return "This is a user controller method";
  }

}