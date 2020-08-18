import { v4 as uuidv4 } from "uuid";

export class InvoiceItem {
  constructor(
    productChildField,
    productName,
    productCount,
    productUnit,
    productDesc,
    productImg
  ) {
    this.productId = uuidv4();
    this.productChildField = productChildField;
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
    parentField,
    field,
    items,
    expireActivity,
    location
  ) {
    this.clientInfo = clientInfo;
    this.provinces = provinces;
    this.cities = cities;
    this.parentField = parentField;
    this.field = field;
    this.items = items;
    this.expireActivity = expireActivity;
    this.location = location;
  }

  toFormData() {
    let fd = new FormData();
    fd.append("clientInfo", this.clientInfo);
    for (let provinceId of this.provinces) {
      fd.append("provinces", provinceId);
    }
    for (let cityId of this.cities) {
      fd.append("cities", cityId);
    }
    fd.append("parentField", this.parentField);
    fd.append("field", this.field);
    for (let item of this.items) {
      fd.append("productChildField", item.productChildField);
      fd.append("productName", item.productName);
      fd.append("productCount", item.productCount);
      fd.append("productUnit", item.productUnit);
      fd.append("productDesc", item.productDesc);
      fd.append("productImg", item.productImg);
    }
    fd.append("expireActivity", this.expireActivity);
    fd.append("location", this.location);
    return fd;
  }
}
