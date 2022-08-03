
require('dotenv').config();
const { Op, Products, Brands } = require('../db');
//const Products = require("../models/Products");
//const Brands = require("../models/Brands");
const dbProducts = require("../db_initial/db_products.json");

async function chargeProducts() {
    try {
        dbProducts.products.map(async(product)=>{
            const findBrand = await Brands.findOne({ where: { name: product.brand }})
            return await Products.findOrCreate({
                where: {
                    name: product.name,
                    description: product.descrition,
                    image: product.image,
                    price: product.price,
                    brandId: findBrand.id
                }
            })
        });
    } catch(error){
        console.log(error.message)
    }
};

async function getAllProducts(req, res){
    chargeProducts();
    try{
        const allProducts = await Products.findAll();
        res.json(allProducts);
    }catch(error){
        res.status(404).json({ error: error.message });
    }
};

async function getProductsDetail(req, res){

};

async function postCreateProducts(req, res){

};

async function deleteProducts(req, res){

};

async function putProducts(req, res){

}

module.exports = {
    chargeProducts,
    getAllProducts,
    getProductsDetail,
    postCreateProducts,
    deleteProducts,
    putProducts
};