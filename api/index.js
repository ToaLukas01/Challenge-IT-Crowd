
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { chargeProducts } = require("./src/controllers/products");
const { chargeBrands } = require("./src/controllers/brands");

let PORT = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(async() => {
  await server.listen(PORT, () => {  //3001 
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
  await chargeBrands();
  await chargeProducts();
});
