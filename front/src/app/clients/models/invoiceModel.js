import { v4 as uuidv4 } from "uuid";

export class InvoiceItem {
  constructor(
    productCategory,
    productName,
    productCount,
    productUnit,
    productDesc,
    productImg
  ) {
    this.productId = uuidv4();
    this.productCategory = productCategory;
    this.productName = productName;
    this.productCount = productCount;
    this.productUnit = productUnit;
    this.productDesc = productDesc;
    this.productImg = productImg;
  }

  log() {
    console.log(this);
  }
}

export class Invoice {
  constructor(
    clientInfo,
    provinces,
    cities,
    mainZone,
    subZone,
    items,
    status,
    location,
  ) {
    this.clientInfo = clientInfo;
    this.provinces = provinces;
    this.cities = cities;
    this.mainZone = mainZone;
    this.subZone = subZone;
    this.items = items;
    this.status = status;
    this.location = location;
  }
}
