const { Province, Imported_Provinces } = require("../models/province-model");
const HttpResponse = require("../models/http-response");

const createNewConvertedProvincesCollection = async (req, res, next) => {
  const importedProvinces = await Imported_Provinces.find();
  const provinces = await Province.find();
  if (provinces.length > 0) {
    const response = new HttpResponse(
      provinces,
      200,
      "خطا، این کالکشن قبلا ایجاد شده است"
    );
    res.json(response);
  } else {
    const trueTypeImportedProvinces = importedProvinces.map(
      (item) => item._doc
    );
    // const allCities = tempAllProvinces.map((province) => province);
    const allCities = trueTypeImportedProvinces.filter(
      (province) =>
        province.state === province.city ||
        province.city === "یاسوج" ||
        province.city === "دهدشت" ||
        province.state === "گچساران" ||
        province.state === "دنا" ||
        province.city === "نسیم شهر" ||
        province.city === "بومهن" ||
        province.city === "اندیشه" ||
        province.city === "اندیشه" ||
        province.city === "پرند" ||
        province.city === "لواسان" ||
        province.city === "شمشک" ||
        province.city === "فشم" ||
        province.city === "رودهن" ||
        province.city === "آبعلی"
    );

    let target1 = [];
    let target2 = [];

    allCities.forEach((item) => {
      if (!target1.includes(item.province)) {
        target1.push(item.province);
      }
    });

    target1.forEach((provinceLabel) => {
      target2.push({ label: provinceLabel, cities: [] });
    });

    allCities.forEach((item) => {
      target2.forEach((province) => {
        if (province.label === item.province) {
          province.cities.push({
            latitude: item.latitude,
            longitude: item.longitude,
            label: item.city,
          });
        }
      });
    });

    target2.forEach(async (item) => {
      let newProvince = new Province(item);
      await newProvince.save();
    });
    const response = new HttpResponse(
      [],
      200,
      "collection created successfully!"
    );
    res.json(response);
  }
};

const getProvinces = async (req, res, next) => {
  try {
    const result = await Province.find();
    const response = new HttpResponse(
      result,
      200,
      "اطلاعات استان ها و شهرها با موفقیت دریافت شد"
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const deleteConvertedProvincesCollection = async (req, res, next) => {
  const provinces = await Province.find();
  if (provinces.length > 0) {
    const result = await Province.collection.drop();
    const response = new HttpResponse(
      result,
      200,
      "collection droped successfully!"
    );
    res.json(response);
  } else {
    const response = new HttpResponse([], 404, "collection not found!");
    res.json(response);
  }
};

module.exports = {
  createNewConvertedProvincesCollection,
  getProvinces,
  deleteConvertedProvincesCollection,
};
