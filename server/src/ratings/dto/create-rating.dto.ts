export class CreateRatingDto {
  type: string;
  ownerid: number;
  domain: number;
  value: number;
  deviation: number;
  volatility: number;
  result: number;
  latest?: boolean;
}
