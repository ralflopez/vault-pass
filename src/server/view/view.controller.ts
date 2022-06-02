import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ViewService } from './view.service';

@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get('/')
  public async showHome(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('/passwords')
  public async showPassword(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('_next*')
  public async assets(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('favicon.ico')
  public async favicon(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('images/**')
  public async assetsFallback(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }
}
