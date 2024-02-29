import { Component } from '@angular/core';
import {Order, ProductOrder, Store, User} from "./services/invoice.service";
import {InvoiceService} from "./services/invoice.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'write-pdf';

  /**
   * Test datas
   * ==========
  */
  store: Store = {
    name: 'Udacity',
    storeAddress: [{
      street: 'Ste. Catherine',
      city: 'Montreal, QC',
      country: 'CA'
    }],
    email: 'test@udacity.com'
  };
  order: Order = {
    uid: 'ifhbkjfdhvuevu',
    orderShortCode: 'REF-JR9BY',
    address: {
      street: '6530 Av. De Chateaubriand',
      city: 'Montreal',
      country: 'CA'
    },
    comment: 'The product will be there soon !',
    createdAt: new Date(),
    orderedAt: new Date()
  };
  user: User = {
    name: 'John Doe',
    emailAddress: 'johndoe@test.com',
    phoneNumber: '+1 514 000 0001',
    address: [
      {
        street: '1200 Atwater Ave, Westmount, Quebec H3Z 1T4',
        city: 'Montreal, QC',
        country: 'CA'
      }
    ]
  };
  products: ProductOrder[] = [
    {
      name: 'PoutineVille - Wall Street',
      quantity: 1,
      price: 120,
      passengerName: 'John Doe',
      metaDatas: [{
        name: 'Seat',
        metaDataValues: [{
          value: 7
        }]
      }]
    }
  ];
 /**
  * ==========
  */

  constructor(private invoiceService: InvoiceService) {
  }

  generatePDF(): void {
    this.invoiceService.generateTicketInvoice(this.order, this.store, this.user, this.products);
  }
}
