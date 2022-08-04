
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const { chargeProducts,
    getAllProducts,
    getProductsDetail,
    postCreateProducts,
    deleteProducts,
    putProducts } = require("../controllers/products");

const { chargeBrands,
    getAllBrands,
    postCreateBrand } = require("../controllers/brands");

router.get("/products", getAllProducts);
//router.get("/products/:id", getProductsDetail);
router.post("/products", postCreateProducts);
router.delete("/products", deleteProducts);
router.put("/products", putProducts);

router.get("/brands", getAllBrands);
router.post("/brands", postCreateBrand);


module.exports = router;
