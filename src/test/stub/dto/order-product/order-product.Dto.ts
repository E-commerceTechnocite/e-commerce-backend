import { OrderProductCreateDto } from '@app/order/dto/order-create.dto';

export const createOrderProductDto = (): OrderProductCreateDto => {
  const stub = new OrderProductCreateDto();
  stub.status = 0;
  stub.paymentType = 0;

  return stub;
};
