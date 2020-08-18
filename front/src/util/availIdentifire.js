export const availIdentifire = (item) => {
  if (item) {
    if (item._id) {
      return item._id;
    } else if (item.id) {
      return item.id;
    } 
    else if (item.productId) {
      return item.productId;
    } else if (item.label) {
      return item.id;
    } else {
      return item;
    }
  } else {
    return ""
  }
};
