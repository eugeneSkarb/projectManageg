import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Industry } from './entities/industry.entity';
import { Repository } from 'typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { EnterpriseIndicators } from './entities/enterpriseIndicators.entity';
import {
  CreateEnterpriseDto,
  CreateIndicatorDto,
  EnterpriseMetricResponse,
  METRICS,
} from './enterprises.dto';

@Injectable()
export class EnterprisesService {
  constructor(
    @InjectRepository(Industry)
    private industriesRepository: Repository<Industry>,
    @InjectRepository(Enterprise)
    private enterprisesRepository: Repository<Enterprise>,
    @InjectRepository(EnterpriseIndicators)
    private indicatorsRepository: Repository<EnterpriseIndicators>,
  ) {}

  async getEnterprises(count = 15, search: string): Promise<Enterprise[]> {
    const query = this.enterprisesRepository.createQueryBuilder('ent');

    if (search) {
      const parameters = { searchString: `%${search}%` };
      query
        .where('ent.name ILIKE :searchString', parameters)
        .orWhere('ent.fullName ILIKE :searchString', parameters)
        .orWhere('ent.inn ILIKE :searchString', parameters)
        .orWhere('ent.ogrn ILIKE :searchString', parameters);
    }

    return query
      .leftJoinAndSelect('ent.industry', 'industry')
      .orderBy('ent.id', 'ASC')
      .limit(count)
      .getMany();
  }

  private calcMetrics(
    indicators: EnterpriseIndicators,
  ): EnterpriseMetricResponse {
    const result = { year: indicators.year, metrics: {} };

    result.metrics[METRICS.KOSOS] =
      (indicators.equity - indicators.nonCurrentAssets) /
      indicators.currentAssets;

    result.metrics[METRICS.KSZISS] =
      indicators.borrowedCapital / indicators.equity;

    result.metrics[METRICS.KTL] =
      indicators.currentAssets / indicators.shortTermObligations;

    result.metrics[METRICS.KAL] =
      (indicators.cash + indicators.shortTermDeposit) /
      indicators.shortTermObligations;

    result.metrics[METRICS.RP] =
      (indicators.grossIncome -
        indicators.administrativeExpenses -
        indicators.commercialExpenses) /
      indicators.revenue;

    return result;
  }

  async getEnterpriseMetrics(enterpriseID: number) {
    const enterpriseIndicatorsByYear = await this.indicatorsRepository.find({
      where: { enterprise: enterpriseID },
      order: { year: 'ASC' },
    });
    if (!enterpriseIndicatorsByYear) {
      throw new HttpException(
        'Индикаторы не найдены для предприятия',
        HttpStatus.NOT_FOUND,
      );
    }

    return enterpriseIndicatorsByYear.map(this.calcMetrics);
  }

  async createEnterprise(enterpriseDto: CreateEnterpriseDto): Promise<number> {
    let industry = await this.industriesRepository.findOne({
      where: { name: enterpriseDto.industryName },
    });

    if (!industry) {
      industry = await this.industriesRepository.save({
        name: enterpriseDto.industryName,
      });
    }

    const newEnterpriseObj = { ...enterpriseDto, industry };
    delete newEnterpriseObj.industryName;

    return (await this.enterprisesRepository.save(newEnterpriseObj)).id;
  }

  async addIndicator(indicatorDto: CreateIndicatorDto) {
    const enterprise = await this.enterprisesRepository.findOne(
      indicatorDto.enterpriseID,
    );

    const entity = { ...indicatorDto, enterprise };
    delete entity.enterpriseID;

    await this.indicatorsRepository.save(entity);
  }
}
