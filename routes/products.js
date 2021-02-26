const express = require("express");
const router = express.Router();
const productsModel = require("../models/products");
const fs = require('fs');
// const productsModel = require(COMPLETE_O_CAMINHO); TODO

// GET - /products
router.get("/", function (req, res) {
  const productsData = productsModel.getProducts();

  res.render("products", {
    title: "Pagina de produtos",
    productsData: productsData,
  });
});

// POST - /products

router.post("/", function (req, res) {
  const newProduct = req.body;
  //Registra que um cadastro foi feito em logNewProduct.txt
  if(fs.existsSync('logs/logNewProduct.txt')) {
    fs.appendFileSync('logs/logNewProduct.txt', 'Cadastro - ' + new Date() + '\n')
  }else {
    fs.writeFileSync('logs/logNewProduct.txt', 'Cadastro - ' + new Date() + '\n')
  }
  
  productsModel.insertProduct(newProduct);
  res.redirect("/products");
});

module.exports = router;
