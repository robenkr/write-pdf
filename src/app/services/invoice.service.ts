import { Injectable } from '@angular/core';
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from "pdfmake/build/vfs-fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export interface Store {
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  email: string
}
export interface Order {
  address: {
    street: string;
    city: string;
    country: string;
  };
  createdAt: Date;
  orderedAt: Date;
}
export interface User {
  name: string;
  emailAddress: string
  phoneNumber: string
}
export interface ProductOrder {
  name: string;
  passengerName: string;
  price: number;
  quantity: number;
  metaDatas: {
    name: string;
    metaDataValues: {
      value: number;
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor() { }

  /**
   * Generate Order Ticket
   * @param order The order
   * @param store The current merchant where the order was made
   * @param user The user who ordered
   * @param products The Products in order
   */
  generateTicketInvoice(order: Order, store: Store, user: User, products: Array<ProductOrder>): void {
    // Here will be the content of the pdf and actions
  }
}
