import { v4 as uuidv4 } from "uuid";

export const invoiceItem = (
  productCategory,
  productName,
  productCount,
  productUnit,
  productDesc,
  productImg
) => ({
  itemId: uuidv4(),
  itemTimestamp: Date.now(),
  productCategory,
  productName,
  productCount,
  productUnit,
  productDesc,
  productImg,
});

export const invoiceInitialValue = () => ({
  productName: "",
  productCount: 1,
  productDesc: "",
  productImg: null,
  showMore: false,
});
