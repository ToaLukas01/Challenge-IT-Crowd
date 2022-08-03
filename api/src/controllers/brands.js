
require('dotenv').config();
const { Op, Products, Brands } = require('../db');
//const Brands = require("../models/Brands");
//const Products = require("../models/Products");
const dbBrands = require("../db_initial/db_brands.json");

async function chargeBrands(){
    try {
        dbBrands.brands.map(async(brand)=>{
            return await Brands.findOrCreate({
                where: {
                    name: brand.name,
                    logo_url: brand.logo_url
                }
            })
        });
    } catch(error){
        console.log(error.message)
    }
};

async function getAllBrands(req, res){
    try {
        chargeBrands();
        const allBrands = await Brands.findAll();
        //   include: {
        //     model: Products,
        //     attributes: ["id", "name"],
        //   },
        // });
        res.send(allBrands);
      } catch (error) {
        res.status(404).send({ error: error.message });
      }
};

async function postCreateBrand(req, res){
    const { name, logo_url } = req.body;
    try{
        if(!name || !logo_url){
            return res.status(404).send("missing datas")
        } 
        else {
            chargeBrands();
            const newBrand =  await Brands.findOrCreate({
                where: {
                    name: name,
                    logo_url: logo_url
                },
            });
            if(newBrand){
                return res.status(200).json(newBrand)
            }
            else {
                return res.status(404).send("There was an error in the new brands creation")
            }
        }
    }catch(error){
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    chargeBrands,
    getAllBrands,
    postCreateBrand
}