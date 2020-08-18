const Path = {
  admin: {
    home: "/home",
    provinces: "/provinces-collection",
    units: "/units-collection",
  },
  clients: {
    home: "/home",
    invoice: "/invoice/:status/:id",
    // selectProvinceCity: "/invoice/new/step-1",
    // selectZone: "/invoice/new/step-2",
    newInvoice: "/invoice/new/create",
    reviewInvoice: "/invoice/review/",
    draftInvoice: "/invoice/draft/",
    editInvoice: "/invoice/edit/",
    viewActiveInvoice: "/invoice/view-active/",
    viewInactiveInvoice: "/invoice/view-inactive/",
  },
};

export default Path;
