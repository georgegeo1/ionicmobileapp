import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx'


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  cin: String;
  newOrder: any;
  paymentMethods : any[];
  countryData : any[];
  country : any;
  paymentMethod : any;
  titleData : any[];
  title : any;
  meta_data1 : any[] = [];
  orderItems: any[] = [];
  temp : any[] = [];
  data3 : any;
  n: String;
  total_tax : any;
  flag = 0;
  orderNumber : any;
  paymentData: any = {};
  fn :any;
  ln : any;
  ad1 : any;
  ad2: any;
  ct : any; 
  st : any;
  pc : any;
  ctr : any;
  em : any;
  ph :any;
  co : any;
  customer_notes : any;
  arr : any;

  


  constructor(public api:ApiService, public storage: Storage, public modalCtrl: ModalController, public http: HttpClient, private alertCtrl: AlertController,
    private toastCtrl: ToastController, private router: Router, public paypal: PayPal) { 
    
    this.newOrder = {};
    this.newOrder.billing_address = {};
  
  this.paymentMethods = [
    {method_id : "bacs", method_title : "Direct Bank Transfer"},
    {method_id : "paypal", method_title : "PayPal"}
  ]
  this.titleData =  [
    {
      "id": 1,
      "name": "Mr."
    },
    {
      "id": 2,
      "name": "Ms."
    },
    {
      "id": 3,
      "name": "Mrs."
    },
    {
      "id": 4,
      "name": "Prof.Dr."
    },
    {
      "id": 5,
      "name": "Dr."
    },
    {
      "id": 6,
      "name": "Assist.Prof.Dr."
    },
    {
      "id": 7,
      "name": "Assoc.Prof.Dr."
    }
  ]
  this.countryData =  [
    {
      "id": 1,
      "name": "Afghanistan"
    },
    {
      "id": 2,
      "name": "Albania"
    },
    {
      "id": 3,
      "name": "Algeria"
    },
    {
      "id": 4,
      "name": "American Samoa"
    },
    {
      "id": 5,
      "name": "Andorra"
    },
    {
      "id": 6,
      "name": "Angola"
    },
    {
      "id": 7,
      "name": "Anguilla"
    },
    {
      "id": 8,
      "name": "Antarctica"
    },
    {
      "id": 9,
      "name": "Antigua and Barbuda"
    },
    {
      "id": 10,
      "name": "Argentina"
    },
    {
      "id": 11,
      "name": "Armenia"
    },
    {
      "id": 12,
      "name": "Aruba"
    },
    {
      "id": 13,
      "name": "Australia"
    },
    {
      "id": 14,
      "name": "Austria"
    },
    {
      "id": 15,
      "name": "Azerbaijan"
    },
    {
      "id": 16,
      "name": "Bahamas"
    },
    {
      "id": 17,
      "name": "Bahrain"
    },
    {
      "id": 18,
      "name": "Bangladesh"
    },
    {
      "id": 19,
      "name": "Barbados"
    },
    {
      "id": 20,
      "name": "Belarus"
    },
    {
      "id": 21,
      "name": "Belgium"
    },
    {
      "id": 22,
      "name": "Belize"
    },
    {
      "id": 23,
      "name": "Benin"
    },
    {
      "id": 24,
      "name": "Bermuda"
    },
    {
      "id": 25,
      "name": "Bhutan"
    },
    {
      "id": 26,
      "name": "Bolivia"
    },
    {
      "id": 27,
      "name": "Bosnia and Herzegovina"
    },
    {
      "id": 28,
      "name": "Botswana"
    },
    {
      "id": 29,
      "name": "Bouvet Island"
    },
    {
      "id": 30,
      "name": "Brazil"
    },
    {
      "id": 31,
      "name": "British Indian Ocean Territories"
    },
    {
      "id": 32,
      "name": "Brunei Darussalam"
    },
    {
      "id": 33,
      "name": "Bulgaria"
    },
    {
      "id": 34,
      "name": "Burkina Faso"
    },
    {
      "id": 35,
      "name": "Burundi"
    },
    {
      "id": 36,
      "name": "Cambodia"
    },
    {
      "id": 37,
      "name": "Cameroon"
    },
    {
      "id": 38,
      "name": "Canada"
    },
    {
      "id": 39,
      "name": "Cape Verde"
    },
    {
      "id": 40,
      "name": "Cayman Islands"
    },
    {
      "id": 41,
      "name": "Central African Republic"
    },
    {
      "id": 42,
      "name": "Chad"
    },
    {
      "id": 43,
      "name": "Chile"
    },
    {
      "id": 44,
      "name": "China, People's Republic of"
    },
    {
      "id": 45,
      "name": "Christmas Island"
    },
    {
      "id": 46,
      "name": "Cocos Islands"
    },
    {
      "id": 47,
      "name": "Colombia"
    },
    {
      "id": 48,
      "name": "Comoros"
    },
    {
      "id": 49,
      "name": "Congo"
    },
    {
      "id": 50,
      "name": "Cook Islands"
    },
    {
      "id": 51,
      "name": "Costa Rica"
    },
    {
      "id": 52,
      "name": "Cote D'ivoire"
    },
    {
      "id": 53,
      "name": "Croatia"
    },
    {
      "id": 54,
      "name": "Cuba"
    },
    {
      "id": 55,
      "name": "Cyprus"
    },
    {
      "id": 56,
      "name": "Czech Republic"
    },
    {
      "id": 57,
      "name": "Denmark"
    },
    {
      "id": 58,
      "name": "Djibouti"
    },
    {
      "id": 59,
      "name": "Dominica"
    },
    {
      "id": 60,
      "name": "Dominican Republic"
    },
    {
      "id": 61,
      "name": "East Timor"
    },
    {
      "id": 62,
      "name": "Ecuador"
    },
    {
      "id": 63,
      "name": "Egypt"
    },
    {
      "id": 64,
      "name": "El Salvador"
    },
    {
      "id": 65,
      "name": "Equatorial Guinea"
    },
    {
      "id": 66,
      "name": "Eritrea"
    },
    {
      "id": 67,
      "name": "Estonia"
    },
    {
      "id": 68,
      "name": "Ethiopia"
    },
    {
      "id": 69,
      "name": "Falkland Islands"
    },
    {
      "id": 70,
      "name": "Faroe Islands"
    },
    {
      "id": 71,
      "name": "Fiji"
    },
    {
      "id": 72,
      "name": "Finland"
    },
    {
      "id": 73,
      "name": "France"
    },
    {
      "id": 74,
      "name": "France, Metropolitan"
    },
    {
      "id": 75,
      "name": "French Guiana"
    },
    {
      "id": 76,
      "name": "French Polynesia"
    },
    {
      "id": 77,
      "name": "French Southern Territories"
    },
    {
      "id": 78,
      "name": "FYROM"
    },
    {
      "id": 79,
      "name": "Gabon"
    },
    {
      "id": 80,
      "name": "Gambia"
    },
    {
      "id": 81,
      "name": "Georgia"
    },
    {
      "id": 82,
      "name": "Germany"
    },
    {
      "id": 83,
      "name": "Ghana"
    },
    {
      "id": 84,
      "name": "Gibraltar"
    },
    {
      "id": 85,
      "name": "Greece"
    },
    {
      "id": 86,
      "name": "Greenland"
    },
    {
      "id": 87,
      "name": "Grenada"
    },
    {
      "id": 88,
      "name": "Guadeloupe"
    },
    {
      "id": 89,
      "name": "Guam"
    },
    {
      "id": 90,
      "name": "Guatemala"
    },
    {
      "id": 91,
      "name": "Guinea"
    },
    {
      "id": 92,
      "name": "Guinea-Bissau"
    },
    {
      "id": 93,
      "name": "Guyana"
    },
    {
      "id": 94,
      "name": "Haiti"
    },
    {
      "id": 95,
      "name": "Heard Island And Mcdonald Islands"
    },
    {
      "id": 96,
      "name": "Honduras"
    },
    {
      "id": 97,
      "name": "Hong Kong"
    },
    {
      "id": 98,
      "name": "Hungary"
    },
    {
      "id": 99,
      "name": "Iceland"
    },
    {
      "id": 100,
      "name": "India"
    },
    {
      "id": 101,
      "name": "Indonesia"
    },
    {
      "id": 102,
      "name": "Iran"
    },
    {
      "id": 103,
      "name": "Iraq"
    },
    {
      "id": 104,
      "name": "Ireland"
    },
    {
      "id": 105,
      "name": "Israel"
    },
    {
      "id": 106,
      "name": "Italy"
    },
    {
      "id": 107,
      "name": "Jamaica"
    },
    {
      "id": 108,
      "name": "Japan"
    },
    {
      "id": 109,
      "name": "Jordan"
    },
    {
      "id": 110,
      "name": "Kazakhstan"
    },
    {
      "id": 111,
      "name": "Kenya"
    },
    {
      "id": 112,
      "name": "Kiribati"
    },
    {
      "id": 113,
      "name": "North Korea"
    },
    {
      "id": 114,
      "name": "South Korea"
    },
    {
      "id": 115,
      "name": "Kuwait"
    },
    {
      "id": 116,
      "name": "Kyrgyzstan"
    },
    {
      "id": 117,
      "name": "Lao Peoples Democratic Republic"
    },
    {
      "id": 118,
      "name": "Latvia"
    },
    {
      "id": 119,
      "name": "Lebanon"
    },
    {
      "id": 120,
      "name": "Lesotho"
    },
    {
      "id": 121,
      "name": "Liberia"
    },
    {
      "id": 122,
      "name": "Libyan Arab Jamahiriya"
    },
    {
      "id": 123,
      "name": "Liechtenstein"
    },
    {
      "id": 124,
      "name": "Lithuania"
    },
    {
      "id": 125,
      "name": "Luxembourg"
    },
    {
      "id": 126,
      "name": "Macau"
    },
    {
      "id": 127,
      "name": "Madagascar"
    },
    {
      "id": 128,
      "name": "Malawi"
    },
    {
      "id": 129,
      "name": "Malaysia"
    },
    {
      "id": 130,
      "name": "Maldives"
    },
    {
      "id": 131,
      "name": "Mali"
    },
    {
      "id": 132,
      "name": "Malta"
    },
    {
      "id": 133,
      "name": "Marshall Islands"
    },
    {
      "id": 134,
      "name": "Martinique"
    },
    {
      "id": 135,
      "name": "Mauritania"
    },
    {
      "id": 136,
      "name": "Mauritius"
    },
    {
      "id": 137,
      "name": "Mayotte"
    },
    {
      "id": 138,
      "name": "Mexico"
    },
    {
      "id": 139,
      "name": "Micronesia"
    },
    {
      "id": 140,
      "name": "Moldova"
    },
    {
      "id": 141,
      "name": "Monaco"
    },
    {
      "id": 142,
      "name": "Mongolia"
    },
    {
      "id": 143,
      "name": "Montserrat"
    },
    {
      "id": 144,
      "name": "Morocco"
    },
    {
      "id": 145,
      "name": "Mozambique"
    },
    {
      "id": 146,
      "name": "Myanmar"
    },
    {
      "id": 147,
      "name": "Namibia"
    },
    {
      "id": 148,
      "name": "Nauru"
    },
    {
      "id": 149,
      "name": "Nepal"
    },
    {
      "id": 150,
      "name": "Netherlands"
    },
    {
      "id": 151,
      "name": "Netherlands Antilles"
    },
    {
      "id": 152,
      "name": "New Caledonia"
    },
    {
      "id": 153,
      "name": "New Zealand"
    },
    {
      "id": 154,
      "name": "Nicaragua"
    },
    {
      "id": 155,
      "name": "Niger"
    },
    {
      "id": 156,
      "name": "Nigeria"
    },
    {
      "id": 157,
      "name": "Niue"
    },
    {
      "id": 158,
      "name": "Norfolk Island"
    },
    {
      "id": 159,
      "name": "Northern Mariana Islands"
    },
    {
      "id": 160,
      "name": "Norway"
    },
    {
      "id": 161,
      "name": "Oman"
    },
    {
      "id": 162,
      "name": "Pakistan"
    },
    {
      "id": 163,
      "name": "Palau"
    },
    {
      "id": 164,
      "name": "Panama"
    },
    {
      "id": 165,
      "name": "Papua New Guinea"
    },
    {
      "id": 166,
      "name": "Paraguay"
    },
    {
      "id": 167,
      "name": "Peru"
    },
    {
      "id": 168,
      "name": "Philippines"
    },
    {
      "id": 169,
      "name": "Pitcairn"
    },
    {
      "id": 170,
      "name": "Poland"
    },
    {
      "id": 171,
      "name": "Portugal"
    },
    {
      "id": 172,
      "name": "Puerto Rico"
    },
    {
      "id": 173,
      "name": "Qatar"
    },
    {
      "id": 174,
      "name": "Reunion"
    },
    {
      "id": 175,
      "name": "Romania"
    },
    {
      "id": 176,
      "name": "Russian Federation"
    },
    {
      "id": 177,
      "name": "Rwanda"
    },
    {
      "id": 178,
      "name": "Saint Helena"
    },
    {
      "id": 179,
      "name": "Saint Kitts and Nevis"
    },
    {
      "id": 180,
      "name": "Saint Lucia"
    },
    {
      "id": 181,
      "name": "Saint Pierre and Miquelon"
    },
    {
      "id": 182,
      "name": "Saint Vincent and The Grenadines"
    },
    {
      "id": 183,
      "name": "Samoa"
    },
    {
      "id": 184,
      "name": "San Marino"
    },
    {
      "id": 185,
      "name": "Sao Tome and Principe"
    },
    {
      "id": 186,
      "name": "Saudi Arabia"
    },
    {
      "id": 187,
      "name": "Senegal"
    },
    {
      "id": 188,
      "name": "Seychelles"
    },
    {
      "id": 189,
      "name": "Sierra Leone"
    },
    {
      "id": 190,
      "name": "Singapore"
    },
    {
      "id": 191,
      "name": "Slovakia"
    },
    {
      "id": 192,
      "name": "Slovenia"
    },
    {
      "id": 193,
      "name": "Solomon Islands"
    },
    {
      "id": 194,
      "name": "Somalia"
    },
    {
      "id": 195,
      "name": "South Africa"
    },
    {
      "id": 196,
      "name": "South Georgia and Sandwich Islands"
    },
    {
      "id": 197,
      "name": "Spain"
    },
    {
      "id": 198,
      "name": "Sri Lanka"
    },
    {
      "id": 199,
      "name": "Sudan"
    },
    {
      "id": 200,
      "name": "Suriname"
    },
    {
      "id": 201,
      "name": "Svalbard and Jan Mayen"
    },
    {
      "id": 202,
      "name": "Swaziland"
    },
    {
      "id": 203,
      "name": "Sweden"
    },
    {
      "id": 204,
      "name": "Switzerland"
    },
    {
      "id": 205,
      "name": "Syrian Arab Republic"
    },
    {
      "id": 206,
      "name": "Taiwan"
    },
    {
      "id": 207,
      "name": "Tajikistan"
    },
    {
      "id": 208,
      "name": "Tanzania"
    },
    {
      "id": 209,
      "name": "Thailand"
    },
    {
      "id": 210,
      "name": "Togo"
    },
    {
      "id": 211,
      "name": "Tokelau"
    },
    {
      "id": 212,
      "name": "Tonga"
    },
    {
      "id": 213,
      "name": "Trinidad and Tobago"
    },
    {
      "id": 214,
      "name": "Tunisia"
    },
    {
      "id": 215,
      "name": "Turkey"
    },
    {
      "id": 216,
      "name": "Turkmenistan"
    },
    {
      "id": 217,
      "name": "Turks and Caicos Islands"
    },
    {
      "id": 218,
      "name": "Tuvalu"
    },
    {
      "id": 219,
      "name": "Uganda"
    },
    {
      "id": 220,
      "name": "Ukraine"
    },
    {
      "id": 221,
      "name": "United Arab Emirates"
    },
    {
      "id": 222,
      "name": "United Kingdom"
    },
    {
      "id": 223,
      "name": "United States"
    },
    {
      "id": 224,
      "name": "United States Minor Outlying Islands"
    },
    {
      "id": 225,
      "name": "Uruguay"
    },
    {
      "id": 226,
      "name": "Uzbekistan"
    },
    {
      "id": 227,
      "name": "Vanuatu"
    },
    {
      "id": 228,
      "name": "Vatican City State"
    },
    {
      "id": 229,
      "name": "Venezuela"
    },
    {
      "id": 230,
      "name": "Vietnam"
    },
    {
      "id": 231,
      "name": "Virgin Islands (British)"
    },
    {
      "id": 232,
      "name": "Virgin Islands (U.S.)"
    },
    {
      "id": 233,
      "name": "Wallis And Futuna Islands"
    },
    {
      "id": 234,
      "name": "Western Sahara"
    },
    {
      "id": 235,
      "name": "Yemen"
    },
    {
      "id": 236,
      "name": "Yugoslavia"
    },
    {
      "id": 237,
      "name": "Zaire"
    },
    {
      "id": 238,
      "name": "Zambia"
    },
    {
      "id": 239,
      "name": "Zimbabwe"
    }
  ]

  this.storage.get('cart').then( (cart) => { 
    this.temp = cart;
    this.total_tax = 0;
    this.temp.forEach((item, index) => {
        this.orderItems.push ({
         product_id : Number(item.product.id),
         quantity : Number(item.quantity),
         name : String(item.product.name),
         //total : String(Math.round(item.product.price*item.quantity)),
         //subtotal : String(Math.round(item.product.price*item.quantity)),
         total: String(Math.round(1.24*item.product.price*item.quantity)),
          //subtotal : String(Math.round(0.24*item.product.price*item.quantity))
   
        });   this.total_tax = this.total_tax + Math.round(1.24*item.product.price*item.quantity);})
        console.log("These are the the order items");console.log(this.orderItems); });
        //"name": String(element.product.name),
        //"total": String(Math.round(element.product.price*element.quantity)),
        //"total_tax": String(Math.round(0.24*element.product.price*element.quantity))

      
      this.http.get('https://conference1.geowebsite.net/wp-json/wc/v2/orders?consumer_key=ck_5771c0da725405879eb158066a586f6541685f18&consumer_secret=cs_6c33a6fdd0e856861ca20929505322b14993c98c').subscribe(res => { 
        this.orderNumber = res[0].id; this.orderNumber = this.orderNumber + 1;
      })


 }

  ngOnInit() {

  
  }

  placeOrder() {
    
    let orderData: any = {};
    let newOrderData :any;
    this.flag = 0;
   

    //if(paymentData.method_id === 'paypal') {
      //TODO
    //}
  
    this.meta_data1 = [[{value: JSON.stringify(this.newOrder.title)}],
      [{value: JSON.stringify(this.newOrder.checkinDate)}],
      [{value: JSON.stringify(this.newOrder.checkoutDate)}],
      [{value: JSON.stringify(this.newOrder.arrivalTime)}],
      [{value: JSON.stringify(this.newOrder.departureTime)}] 
      ]

      this.paymentData.method_id = "";
      this.paymentData.method_title = "";

      for (let pm of this.paymentMethods) {
        if (pm.method_title === this.newOrder.paymentMethod) {
          this.paymentData.method_id = pm.method_id;
          this.paymentData.method_title = pm.method_title;
        }
      }
      
      this.customer_notes = "";
      if (this.newOrder.notes !!=null) {
        this.customer_notes = this.newOrder.notes;
      }

      this.fn = String(this.newOrder.firstName);
      this.ln = String(this.newOrder.lastName);
      this.ad1 = String(this.newOrder.address);
      this.ad2 = String(this.newOrder.streetNumber);
      this.ct = String(this.newOrder.city);
      this.st = String(this.newOrder.state);
      this.pc = String(this.newOrder.postcode);
      this.ctr = String(this.newOrder.country);
      this.em = String(this.newOrder.email);
      this.ph = String(this.newOrder.phone);
      this.co = String(this.newOrder.company);

      
      

      orderData = {
      "payment_method" : this.paymentData.method_id,
      "payment_method_title" : this.paymentData.method_title,
      "status" : "on-hold",
      "customer_note" : String(this.customer_notes),
      "billing" : {
        "first_name": this.fn,
        "last_name": this.ln,
        "address_1": this.ad1,
        "address_2": this.ad2,
        "city": this.ct,
        "state": this.st,
        "postcode": this.pc,
        "country": this.ctr,
        "email": this.em,
        "phone": this.ph, 
        "company": this.co
      },
      "shipping": {
        "first_name" : "",
        "last_name": "",
        "address_1": "",
        "address_2": "",
        "city": "",
        "state": "",
        "postcode": "",
        "country": ""
      },
       "line_items": this.orderItems ,
       "meta_data" :[
       {
          "key" : "_billing_myfield12",
          "value" : String(this.newOrder.title)
       },
       {
          "key" : "_billing_myfield13c",
          "value" : String(this.newOrder.checkinDate).substr(0,10)
       },
       {
        "key" : "_billing_myfield13",
        "value" : String(this.newOrder.checkoutDate).substr(0,10)
       },
       {
        "key" : "_billing_myfield14",
        "value" : String(this.newOrder.arrivalTime).substr(11,5)
       },
       {
         "key" : "_billing_myfield15",
         "value" : String(this.newOrder.departureTime).substr(11,5)
       },
       {
         "key" : "is_vat_exempt",
         "value" : "no"
       },
       {
        "key" : "is_vat_exempt",
        "value" : "no"
      },
      {
        "key" : "is_vat_exempt",
        "value" : "no"
      }

      ]
      
    

      
    }

        //this.dialogs.alert("Please fill in all the required fields", "Invalid Input", "OK");
    if (this.paymentData.method_id === "paypal") {

      this.paypal.init({
        PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
        PayPalEnvironmentSandbox: 'AfXcoKIBOIopqnVxKAv-eiATANujnI8ICSXKPH3KZN5bsvSrpicIRPgthwDuxAfMc4nxvldZjyGLaxnS'
      }).then(() => {
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.paypal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
          // Only needed if you get an "Internal Service Error" after PayPal login!
          //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {
          
          this.storage.get('cart').then( (cart) => {
            let total = 0;
            cart.forEach((element,index) => {
              this.orderItems.push({product_id : element.product.id, quantity : element.quantity});
              total = Math.round(total + 1.24*(element.product.price * element.quantity));
            })

            let payment = new PayPalPayment(String(total), 'EUR', 'Description', 'sale');
            this.paypal.renderSinglePaymentUI(payment).then((response) => {
              // Successfully paid
        
             //alert(JSON.stringify(response));

          })



         
          }, () => {
            // Error or render dialog closed without being successful
          });
        }, () => {
          // Error in configuration
        });
      }, () => {
        // Error in initialization, maybe PayPal isn't supported or something else
      });

    const consumer_key = "ck_5771c0da725405879eb158066a586f6541685f18";
    const consumer_secret = "cs_6c33a6fdd0e856861ca20929505322b14993c98c";
    const encoded = btoa(consumer_key + ":" + consumer_secret); 

    
    this.http.post('https://conference1.geowebsite.net/wp-json/wc/v2/orders',
    orderData, {
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Basic ' + encoded
    }
    }).subscribe(response => { newOrderData=response; console.log(newOrderData); 
    
    })



    }
    else {
  

    const consumer_key = "ck_5771c0da725405879eb158066a586f6541685f18";
    const consumer_secret = "cs_6c33a6fdd0e856861ca20929505322b14993c98c";
    const encoded = btoa(consumer_key + ":" + consumer_secret); 

    
    this.http.post('https://conference1.geowebsite.net/wp-json/wc/v2/orders',
    orderData, {
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Basic ' + encoded
    }
    }).subscribe(response => { newOrderData=response; console.log(newOrderData); 
    
    })
      
    
  }
      



}

async presentToast() {

  let toast = await this.toastCtrl.create({
    message: 'Your order (Number ' + String(this.orderNumber) + ' ) has been received.',
    duration: 60000,
    position: 'bottom',
    buttons: [
        {
          text: 'OK',
          handler: () => {
            this.closeCheckout();
            //this.router.navigateByUrl('/home');
          }
        }]
    
  });

  await toast.present(); 
}



  closeCheckout() {
    this.modalCtrl.dismiss();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header : "Invalid Input",
      message : "Please fill in all the required fields.",
      buttons : ["OK"] 
    });

    await alert.present();
  }




}
