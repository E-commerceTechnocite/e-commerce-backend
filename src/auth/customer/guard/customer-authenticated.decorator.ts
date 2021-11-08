import { SetMetadata } from '@nestjs/common';

export const CUSTOMER_AUTHENTICATED_KEY = 'customer-authenticated';

export const CustomerAuthenticated = () =>
  SetMetadata(CUSTOMER_AUTHENTICATED_KEY, true);
