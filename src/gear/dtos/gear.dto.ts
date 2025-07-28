import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateGearDto {
  @IsNumber()
  @IsOptional()
  notifyThreshold?: number;

  @IsBoolean()
  @IsOptional()
  stopNotifications?: boolean;
}
