import dayjs, { Dayjs } from "dayjs";
import { paymentState, saleCategory } from "../enums";
import { ISale } from "../models";

export class Sale implements ISale {
  id: string;
  name: string;
  category: saleCategory;
  amount: string;
  price: string;
  saleDate: Dayjs;
  recipientName: string;
  contact: string;
  paymentState: paymentState;
  paymentDate: Dayjs;

  constructor(data?: any) {
    this.id = data?.id;
    this.name = data?.name;
    this.category = data?.category;
    this.amount = data?.amount;
    this.price = data?.price;
    this.saleDate = dayjs(data?.saleDate || data?.sale_date);
    this.recipientName = data?.recipientName || data?.recipient_name;
    this.contact = data?.contact;
    this.paymentState = data?.paymentState || data?.payment_state;
    this.paymentDate = dayjs(data?.paymentDate || data?.payment_date);
  }
}
