export class CreateEnterpriseDto {
  name: string;
  fullName: string;
  inn: string;
  ogrn: string;
  industryName: string;
}

export class CreateIndicatorDto {
  year: number;
  equity: number;
  borrowedCapital: number;
  currentAssets: number;
  nonCurrentAssets: number;
  shortTermObligations: number;
  cash: number;
  shortTermDeposit: number;
  grossIncome: number;
  commercialExpenses: number;
  administrativeExpenses: number;
  revenue: number;
  enterpriseID: number;
}

export const METRICS = {
  KOSOS: 'kosos',
  KSZISS: 'ksziss',
  KTL: 'ktl',
  KAL: 'kal',
  RP: 'rp',
};

export const METRIC_NAMES = {
  [METRICS.KOSOS]:
    'Коэффициент обеспеченности собственными оборотными средствами',
  [METRICS.KSZISS]: 'Коэффициент соотношения заёмных и собственных средств',
  [METRICS.KTL]: 'Коэффициент текущей ликвидности',
  [METRICS.KAL]: 'Коэффициент абсолютной ликвидности',
  [METRICS.RP]: 'Рентабельность продаж по прибыли продаж',
};

export class EnterpriseMetricResponse {
  year: number;
  metrics: { [key: number]: number };
}
