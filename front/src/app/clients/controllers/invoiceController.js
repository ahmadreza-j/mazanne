import * as clientModel from "../models/invoiceModel";

const getPosition = (options) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const createdInvoiceItem = (
  productCategory,
  productName,
  productCount,
  productUnit,
  productDesc,
  productImg
) => {
  return new clientModel.InvoiceItem(
    productCategory,
    productName,
    productCount,
    productUnit,
    productDesc,
    productImg
  );
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

export const createdInvoice = (
  userInfo,
  provinces,
  cities,
  mainZone,
  subZone,
  items
  // location
) => {
  const _provinces = [...provinces];
  _provinces.forEach((province) => delete province.cities);
  const { data: mainZoneData, ..._mainZone } = mainZone;
  const { data: subZoneData, ..._subZone } = subZone;
  const location = null;

  return new clientModel.Invoice(
    userInfo,
    _provinces,
    cities,
    _mainZone,
    _subZone,
    items,
    location
  );
};
