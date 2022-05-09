import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Industry } from './entities/industry.entity';
import { Enterprise } from './entities/enterprise.entity';
import { EnterpriseIndicators } from './entities/enterpriseIndicators.entity';
import { EnterprisesService } from './enterprises.service';
import { EnterprisesController } from './enterprises.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Industry, Enterprise, EnterpriseIndicators]),
  ],
  providers: [EnterprisesService],
  controllers: [EnterprisesController],
})
export class EnterprisesModule {}
