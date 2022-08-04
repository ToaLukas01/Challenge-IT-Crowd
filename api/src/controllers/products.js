
require('dotenv').config();
const { Op, Products, Brands } = require('../db');
const { chargeBrands } = require("./brands");
const dbProducts = require("../db_initial/db_products.json");

async function chargeProducts() {
    try {
        dbProducts.products.map(async(product)=>{
            await chargeBrands();
            const findBrand = await Brands.findOne({ where: { name: product.brand }});
            if(findBrand){
                return await Products.findOrCreate({
                    where: {
                        name: product.name,
                        description: product.descrition,
                        image: product.image,
                        price: product.price,
                        brandId: findBrand.id
                    }
                })
            }
            else {
                console.log("id o nombre no encontrados");
            }
        });
    } catch(error){
        console.log(error.message)
    }
};

async function getAllProducts(req, res){
    try{
        await chargeProducts();
        const { id } = req.query; //req.query; req.params.id
        const allProducts = await Products.findAll({
            include: {
                model: Brands,
                attributes: ["name"],
            }
        });
        if(id){
            const productID = await Products.findByPk(id);
            if(productID){
                return res.status(200).send(productID);
            } 
            else {
                return res.status(404).send("Canot find the ID of the product");
            }
        };
        res.json(allProducts);
    }catch(error){
        res.status(404).json({ error: error.message });
    }
};

async function getProductsDetail(req, res){
    try{
        const { id } = req.params.id;//req.query; req.params.id
        if(id){
            const productID = await Products.findByPk(id);
            if(productID){
                return res.status(200).send(productID);
            } 
            else {
                return res.status(404).send("Canot find the ID of the product");
            }
        } else {
            return res.status(404).send("There was a error in the ID of the searching product");
        }
    } catch(error){
        res.status(404).json({ error: error.message });
    }
};

async function postCreateProducts(req, res){
    try{
        const { name, description, image, price, brandId } = req.body;
        if(!name || !description || !image || !price || !brandId){ 
            console.log("ESTOS SON LOS DATOS QUE LLEGARON: name:",name,"descrpcion",description, "image",image, "price",price, "brand",brandId)
            return res.status(404).send("missing important datas");
        } 
        else {
            await Brands.findOrCreate({ where: {name: brandId }});
            const foundBrand = await Brands.findOne({where: { name: brandId } }); 
            if(foundBrand){
                const newProduct = await Products.findOrCreate({
                    where: {
                        name: name,
                        description: description,
                        image: image,
                        price: price,
                        brandId: foundBrand.id
                    }
                });
                if(newProduct){
                    return res.status(201).send("Product succesfuli created");
                } else {
                    return res.status(400).send("There was a error in the products creation");
                };
            };
        };
    }catch(error){
        res.status(404).json({ error: error.message });
    }
};

async function deleteProducts(req, res){
    try {
        const { id } = req.query;
        if(!id){
            return res.status(404).send("Need a ID to delet one product");
        } else {
            const product = await Products.findByPk(id);
            if(!product){
                return res.status(404).send("The product was not found");
            } else {
                const destroyed = await product.destroy();
                if(destroyed){
                    return res.status(201).send("Product destroyed succesfully");
                }
            }
        }
    } catch(error){
        res.status(404).json({ error: error.message });
    }
};

async function putProducts(req, res){
    try {
        const { id, name, description, image, price, brandId } = req.body;
        const upload = await Products.findByPk(id);
        if(upload){
            await Products.update({
                name: name || upload.name,
                description: description || upload.description,
                image: image || upload.image,
                price: price || upload.price,
                brandId: brandId || upload.brandId
            },{where: { id: id}});
            const uploatedProduct = await Products.findByPk(id,{include: { model: Brands, as: "brand"}});
            if(uploatedProduct){
                return res.status(201).send(uploatedProduct);
            }
            else {
                return res.status(404).send("There was a error in the update of the product");
            };
        } else {
            return res.status(404).send("There was a error finding the product to update");
        };
    } catch(error){
        res.status(404).json({ error: error.message });
    }
}

module.exports = {
    chargeProducts,
    getAllProducts,
    getProductsDetail,
    postCreateProducts,
    deleteProducts,
    putProducts
};