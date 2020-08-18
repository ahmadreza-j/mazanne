const {
  Province,
  City,
  Imported_Provinces,
} = require("../models/province-model");
const HttpResponse = require("../models/http-response");

const createProvincesCollection = async (req, res, next) => {
  const importedCities = await Imported_Provinces.find();
  const getedProvinces = await Province.find();
  if (getedProvinces.length > 0) {
    const response = new HttpResponse(
      getedProvinces,
      200,
      "error!!! this collection has already created!"
    );
    res.json(response);
  } else {
    const trueTypeImportedCities = importedCities.map((item) => item._doc);

    const allProvinces = new Set(
      trueTypeImportedCities.map((item) => item.province.trim())
    );

    try {
      allProvinces.forEach(async (item) => {
        let newProvince = new Province({ label: item });
        await newProvince.save();
      });
      const response = new HttpResponse(
        [],
        200,
        "'provinces' collection created successfully!"
      );
      res.json(response);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
};

const createCitiesCollection = async (req, res, next) => {
  const importedProvinces = await Imported_Provinces.find();
  const getedCities = await City.find();
  if (getedCities.length > 0) {
    const response = new HttpResponse(
      getedCities,
      200,
      "error!!! this collection has already created!"
    );
    res.json(response);
  } else {
    const getedProvinces = await Province.find();
    const trueTypeImportedProvinces = importedProvinces.map(
      (item) => item._doc
    );
    const allFilteredCities = trueTypeImportedProvinces.filter(
      (city) =>
        city.state === city.city ||
        city.city === "یاسوج" ||
        city.city === "دهدشت" ||
        city.state === "گچساران" ||
        city.state === "دنا" ||
        city.city === "نسیم شهر" ||
        city.city === "بومهن" ||
        city.city === "اندیشه" ||
        city.city === "اندیشه" ||
        city.city === "پرند" ||
        city.city === "لواسان" ||
        city.city === "شمشک" ||
        city.city === "فشم" ||
        city.city === "رودهن" ||
        city.city === "آبعلی"
    );

    let customizedCities = [];

    allFilteredCities.forEach((city) => {
      getedProvinces.forEach((province) => {
        if (province.label.trim() === city.province.trim()) {
          customizedCities.push({
            latitude: city.latitude.trim(),
            longitude: city.longitude.trim(),
            label: city.city.trim(),
            provinceId: province._id,
          });
        }
      });
    });

    customizedCities.forEach(async (item) => {
      let newCity = new City(item);
      await newCity.save();
    });
    const response = new HttpResponse(
      [],
      200,
      "'cities' collection created successfully!"
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
      "اطلاعات استان ها با موفقیت دریافت شد"
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getCities = async (req, res, next) => {
  const type = req.params.type;
  if (type === "populated") {
    try {
      const result = await City.find()
        .select("label")
        .populate("provinceId", "label");
      const response = new HttpResponse(
        result,
        200,
        "اطلاعات شهرها با موفقیت دریافت شد"
      );
      res.json(response);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  } else {
    try {
      const result = await City.find().select("label provinceId");
      const response = new HttpResponse(
        result,
        200,
        "اطلاعات شهرها با موفقیت دریافت شد"
      );
      res.json(response);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
};

const deleteConvertedProvincesCollection = async (req, res, next) => {
  const provinces = await Province.find();
  const cities = await City.find();
  if (provinces.length > 0) {
    await Province.collection.drop();
    const response = new HttpResponse(
      [],
      200,
      "'provinces' collection droped successfully!"
    );
    if (cities.length > 0) {
      await City.collection.drop();
      response = new HttpResponse(
        [],
        200,
        "'provinces & cities' collections droped successfully!"
      );
    }
    res.json(response);
  } else {
    const response = new HttpResponse(
      [],
      404,
      "'provinces & cities' collection not found!"
    );
    if (cities.length > 0) {
      await City.collection.drop();
      response = new HttpResponse(
        [],
        404,
        "'provinces' collections not found! but 'cities' collections droped successfully!"
      );
    }
    res.json(response);
  }
};

module.exports = {
  createProvincesCollection,
  createCitiesCollection,
  getProvinces,
  getCities,
  deleteConvertedProvincesCollection,
};
