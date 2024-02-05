import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {

  @Get()
  getHMainPage() {
    return {
      "message": "Hello, this is simple todo-app, get the /api to start use it",
    };
  }
}
