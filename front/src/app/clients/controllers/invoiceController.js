import { Invoice, InvoiceItem } from "../models/invoiceModel";

const getPosition = (options) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const invoiceInitialValue = () => ({
  productName: "",
  productCount: 1,
  productDesc: "",
  productImg: null,
  showMore: false,
});

export const clientLocation = async () => {
  try {
    const location = await getPosition();
    return location.coords;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createdInvoiceItem = (
  productChildField,
  productName,
  productCount,
  productUnit,
  productDesc,
  productImg
) => {
  return new InvoiceItem(
    productChildField,
    productName,
    productCount,
    productUnit,
    productDesc,
    productImg
  );
};

export const createdInvoice = (
  clientInfo,
  provinces,
  cities,
  parentField,
  field,
  items,
  expireActivity
  // location
) => {
  const _clientInfo = clientInfo._id;
  const _provinces = provinces.map((province) => province._id);
  const _cities = cities.map((city) => city._id);
  const _parentField = parentField._id;
  const _field = field._id;
  const _items = items.map((item) => {
    return {
      productId: item.productId,
      productChildField: item.productChildField._id,
      productName: item.productName,
      productCount: item.productCount,
      productUnit: item.productUnit._id,
      productDesc: item.productDesc,
      productImg: item.productImg ? item.productImg.file : null,
    };
  });
  // const { data: mainZoneData, ..._mainZone } = mainZone;
  const _expireActivity = expireActivity.value;
  const _location = null;

  return new Invoice(
    _clientInfo,
    _provinces,
    _cities,
    _parentField,
    _field,
    _items,
    _expireActivity,
    _location
  );
};
