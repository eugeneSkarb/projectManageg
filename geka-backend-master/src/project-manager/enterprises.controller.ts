import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';
import { Enterprise } from './entities/enterprise.entity';
import {
  CreateEnterpriseDto,
  CreateIndicatorDto,
  METRIC_NAMES,
} from './enterprises.dto';

@Controller()
export class EnterprisesController {
  constructor(private readonly enterpriseService: EnterprisesService) {}

  @Get('enterprises/paginated')
  getEnterprises(@Query() query): Promise<Enterprise[]> {
    return this.enterpriseService.getEnterprises(query.count, query.search);
  }

  @Get('enterprises/:id')
  getEnterpriseMetrics(@Param('id') enterpriseID) {
    return this.enterpriseService.getEnterpriseMetrics(enterpriseID);
  }

  @Get('metrics/all')
  getAllMetrics() {
    return METRIC_NAMES;
  }

  @Post('enterprises/create')
  async createEnterprise(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterpriseService.createEnterprise(createEnterpriseDto);
  }

  @Post('indicators/add')
  async addIndicator(@Body() createIndicatorDto: CreateIndicatorDto) {
    return this.enterpriseService.addIndicator(createIndicatorDto);
  }
}
