import { Injectable } from '@angular/core';
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from "pdfmake/build/vfs-fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export interface Store {
  name: string;
  storeAddress: [{
    street: string;
    city: string;
    country: string;
  }];
  email: string
}
export interface Order {
  uid: string;
  orderShortCode: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  comment: string;
  createdAt: Date;
  orderedAt: Date;
}
export interface User {
  name: string;
  emailAddress: string;
  phoneNumber: string;
  address: [{
    street: string;
    city: string;
    country: string;
  }];
}
export interface ProductOrder {
  name: string;
  passengerName: string;
  price: number;
  quantity: number;
  metaDatas: [{
    name: string;
    metaDataValues: [{
      value: number;
    }]
  }];
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
    const docDefinition = {
      info: {
        title: `receipt-${order.orderShortCode}`,
        author: 'Rockstar',
        subject: 'Receipt',
        keywords: 'receipt',
      },
      pageSize: 'A4',
      pageMargins: [ 40, 60, 40, 60 ],
      watermark: {
        text: 'Original',
        color: '#9CCDC1',
        opacity: 0.1,
        bold: true,
        italics: false
      },
      header: [
        {
          margin: [40, 10, 40, 10],
          columns: [
            [
              {
                text: store.name,
                fontSize: 14,
                color: '#0E1D2D',
                bold: true
              },
              { text: `${store?.storeAddress[0].street || '-'}, ${store?.storeAddress[0].city || '-'}, ${store?.storeAddress[0].country || '-'}` },
            ],
          ],
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      },
      footer: [
        {
          margin: [40, 10, 40, 10],
          columns: [
            [
              {
                text: 'Rockstar',
                fontSize: 16,
                color: '#229C81',
                bold: true
              },
            ],
            [
              {
                text: '505 St Catherine St E, Montreal, Quebec H2L 2C9',
                fontSize: 10,
                bold: true
              }
            ],
            [
              {
                text: 'Email: info@rockstar.cd',
                fontSize: 10,
                bold: true
              },
              {
                text: 'Phone: +243 975 600 109',
                fontSize: 10,
                bold: true
              },
              {
                text: 'Web: www.rockstar.cd',
                fontSize: 10,
                bold: true
              }
            ]
          ]
        }
      ],
      content: [
        {
          text: 'FACTURE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: '#229C81'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: user.name || '-',
                bold: true
              },
              { text: `${order?.address?.street || user.address[0]?.street || '-'}, ${order?.address?.city || user.address[0]?.city || '-'}, ${order?.address?.country || user.address[0]?.country || '-'}`},
              { text: user.emailAddress || '-'},
              { text: user.phoneNumber || '-'}
            ],
            [
              {
                table: {
                  headerRows: 1,
                  widths: [100, 'auto'],
                  body: [
                    [
                      {
                        text: 'Date',
                        bold: true,
                        style: 'tableHeader',
                        border: [false, false, false, false]
                      },
                      {
                        // @ts-ignore
                        text: new Date(order.createdAt.seconds * 1000).toLocaleString().toString(),
                        border: [true, true, true, true]
                      }
                    ],
                    [{
                      text: 'Invoice N°',
                      bold: true,
                      style: 'tableHeader',
                      border: [false, false, false, false]},
                      {text: order.orderShortCode, border: [true, true, true, true]}
                    ],
                    [
                      {
                        text: 'Customer',
                        bold: true,
                        style: 'tableHeader',
                        border: [false, false, false, false]
                      },
                      {text: user.name, italics: true, border: [true, true, true, true]}
                    ],
                    [
                      {
                        text: 'Due Date',
                        bold: true,
                        style: 'tableHeader',
                        border: [false, false, false, false]
                      },
                      {
                        // @ts-ignore
                        text: new Date(order.orderedAt.seconds * 1000).toLocaleString().toString(),
                        italics: true,
                        border: [true, true, true, true]
                      },
                      {
                        text: 'Order Details',
                        style: 'sectionHeader'
                      },
                      {
                        table: {
                          headerRows: 1,
                          widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],
                          body: [
                            [{text: 'Products', bold: true, style: 'tableHeader'},
                              {text: 'Passenger', bold: true, style: 'tableHeader'},
                              {text: 'Seat', bold: true, style: 'tableHeader'},
                              {text: 'Price', bold: true, style: 'tableHeader'},
                              {text: 'Quantity', bold: true, style: 'tableHeader'},
                              {text: 'Amount', bold: true, style: 'tableHeader'}
                            ],
                            ...products.map(
                              (product) => (
                                [
                                  product.name,
                                  product.passengerName,
                                  product.metaDatas[0].metaDataValues[0].value,
                                  product.price,
                                  product.quantity,
                                  (product.price * product.quantity).toFixed(2)
                                ]
                              )
                            ),
                            [
                              {text: 'Total Amount', bold: true, style: 'tableHeader', colSpan: 5},
                              {}, {}, {}, {},
                              {
                                text: products.reduce((sum, product) =>
                                  sum + (product.quantity * product.price), 0).toFixed(2),
                                bold: true,
                                fillColor: '#229C81',
                                color: '#fff',
                              }],
                            {
                              text: 'Additional Details',
                              style: 'sectionHeader'
                            },
                            {
                              text: order.comment,
                              margin: [0, 0 , 0, 15]
                            },
                            {
                              columns: [
                                [
                                  {
                                    qr: `ShortCode: ${order.uid}`,
                                    fit: 100, foreground: '#229C81'
                                  }],
                                [{
                                  text: 'Terms and Conditions',
                                  style: 'sectionHeader'
                                },
                                  {
                                    ul: [
                                      'Order can be return in max 10 days.',
                                      'Warrenty of the product will be subject to the manufacturer terms and conditions.',
                                      'This is system generated invoice.',
                                    ],
                                  }],
                              ]
                            },
                          ],
                        },
                        layout: {
                          fillColor: (rowIndex: number) => {
                            return (rowIndex % 2 === 1) ? '#f5faf8' : null;
                          }
                        }
                      },
                    ],
                  ]
                }
              }
            ]
          ]
        },
      ]
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
