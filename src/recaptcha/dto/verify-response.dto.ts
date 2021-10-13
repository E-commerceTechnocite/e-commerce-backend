export interface VerifyResponseDto {
  success?: boolean;
  challenge_ts?: string;
  hostname: string;
  error_codes: any[];
}
