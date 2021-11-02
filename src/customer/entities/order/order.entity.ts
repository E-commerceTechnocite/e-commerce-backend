import { PaymentType } from "./order.paymentType.enum";
import { Status } from "./order.status.enum";


export class Order {
    idOrder: string;
    status : Status; // enum
    createdAt: string;
    paymentType: PaymentType; //enum
    idCustomer: string;
    idAddress: string ;

}