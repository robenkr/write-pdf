import { Component } from '@angular/core';
import {Order, ProductOrder, Store, User} from "./services/invoice.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'write-pdf';

  store: Store = {
    name: 'Udacity',
    address: {
      street: 'Ste. Catherine',
      city: 'Montreal, QC',
      country: 'CA'
    },
    email: 'test@udacity.com'
  };
  order: Order = {
    address: {
      street: '6530 Av. De Chateaubriand',
      city: 'Montreal',
      country: 'CA'
    },
    createdAt: new Date(),
    orderedAt: new Date()
  };
  user: User = {
    name: 'John Doe',
    emailAddress: 'johndoe@test.com',
    phoneNumber: '+1 514 000 0001'
  }
  products: ProductOrder[] = [
    {
      name: 'PoutineVille - Wall Street',
      quantity: 1,
      price: 120,
      passengerName: 'John Doe',
      metaDatas: {
        name: 'Seat',
        metaDataValues: {
          value: 7
        }
      }
    }
  ]
}
