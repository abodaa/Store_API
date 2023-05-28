const Product = require("../models/product");
const staticProducts = require("../products.json");

const getAllProducts = async (req, res) => {
  try {
    const { featured, company, name, sort, field } = req.query;
    const productDatasObj = {};
    if (featured) {
      productDatasObj.featured = featured === "true" ? true : false;
    }
    if (company) {
      productDatasObj.company = company;
    }
    if (name) {
      productDatasObj.name = { $regex: name, $options: "i" };
    }

    let result = Product.find(productDatasObj);

    // ****** SORTING *****//

    if (sort) {
      let sortList = sort.split(",").join(" ");
      // console.log(sortList)
      result = result.sort(sortList);
    } else {
      result = result.sort("createdAt");
    }

    // ****** SELECTING FIELDS TO BE SHOWN *****//

    if (field) {
      let fieldList = field.split(",").join(" ");
      result = result.select(fieldList);
    }
    //?????? ******* PAGINATION AND LIMIT (time stamp 4:39 4:50) ?????? ******//
    //?????? ******* NUMERIC FILTERS (time stamp  4:50 - 5:06) ?????? ******//

    const allProducts = await result;

    res.status(200).json({ allProducts, nbHits: allProducts.length });
  } catch (error) {
    console.log(error);
  }
};

// *********** STATIC DATA *************//

const getAllStaticProducts = async (req, res) => {
  try {
    res.status(200).json(staticProducts);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllProducts, getAllStaticProducts };
