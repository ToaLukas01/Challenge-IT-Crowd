
Challenge IT Crowd Products

README EN ESPAÑOL

Este es una API CRUD realizada en base a un Challenge para la empresa IT Crowd, la API se base en productos de distinta índole, sus funcionalidades constan de una pagina principal con paginado con 4 productos por página, un botón de acción que permite agregar nuevos productos y al realizarle click a cada carta de producto se le redirigirá a su detalle.
El posteo de productos solicitará todos los datos para que sean llenados, seleccionados o cargados, dependiendo del caso, con la posibilidad de al mismo tiempo postear una nueva marca para el producto si es que no se encuentra precargada en la base de datos. Se utiliza la API de clodinari para poder cargar imágenes desde el ordenador permitiendo así convertir las imágenes en links URL.
Dentro de cada detalle de producto se ven todos sus atributos y la posibilidad de borrar el producto de la base de datos o modificarlo de ser deseado. En caso de modificarlo se brindará una vista modal con todos sus datos y la posibilidad de seleccionar los que se desee modificar, y la posibilidad de postear una nueva marca para el producto de ser necesario.

Este proyecto utilizó tecnologías tales como Node.js, JavaScript, PostgresSQL, SQL, Express, React, Redux, HTML, CSS, clodinari.

Para descargar el proyecto y hacerlo funcionar se deberá acceder al repositorio de GitHub, Forkearlo y luego clonarlo en su computadora, una vez abierto con el editor de texto deberá ingresar a la carpeta "api"(correspondiente al Backend) y la carpeta "client"(correspondiente al Frontend) y realizar el comando "npm install" o "npm i" en cada carpeta individualmente, y una vez realizadas las instalaciones deberá ejecutar el comando "npm start" desde la carpeta "api" para inicializar el Backend y en la carpeta "client" para inicializar el Frontend.

Antes de ejecutar los comandos recuerde configurar el archivo ".env" de la carpeta "api" configurando sus variables:
- DB_USER=(nombre de usuario de postgres)
- DB_PASSWORD=(contraseña de postgres)
- DB_HOST=localhost
- DB_NAME=(nombre de la base de datos que usted creó para esta api)
- DB_PORT=(puerto de la base de datos que utilice)
- PORT_APP=3001

En caso de que el Frontend no se esté ejecutando correctamente deberá realizar las siguientes instalaciones en la carpeta client:
- "npm i axios"
- "npm i redux-thunk"
- "npm i react-redux"
- "npm i react-router-dom@5.3.0"
- "npm i redux"
- "npm i @material-ui/core"
- "npm i react-router"

Espero que esta API sea de su agrado y sepan que siempre está dispuesta a mejorar

README IN ENGLISH

This is a CRUD API made based on a Challenge for the IT Crowd company, the API is based on products of different kinds, its functionalities consist of a main page with pagination with 4 products per page, an action button that allows adding new products and when you click on each product letter you will be redirected to its detail.
The posting of products will request all the data to be filled, selected or loaded, depending on the case, with the possibility of posting a new brand for the product at the same time if it is not preloaded in the database. The clodinari API is used to be able to load images from the computer, thus allowing the images to be converted into URL links.
Within each product detail you can see all its attributes and the possibility of deleting the product from the database or modifying it if desired. In case of modifying it, a modal view will be provided with all its data and the possibility of selecting the ones that you want to modify, and the possibility of posting a new brand for the product if necessary.

This project used technologies such as Node.js, JavaScript, PostgresSQL, SQL, Express, React, Redux, HTML, CSS, clodinari.

To download the project and make it work, you must access the GitHub repository, Fork it and then clone it on your computer, once opened with the text editor you must enter the "api" folder (corresponding to the Backend) and the "client" folder (corresponding to the Frontend) and perform the command "npm install" or "npm i" in each folder individually, and once the installations are done, you must execute the command "npm start" from the "api" folder to initialize the Backend and in the "client" folder to initialize the Frontend.

Before executing the commands, remember to configure the ".env" file in the "api" folder by setting its variables:
- DB_USER=(postgres username)
- DB_PASSWORD=(postgres password)
-DB_HOST=localhost
- DB_NAME=(name of the database you created for this api)
- DB_PORT=(port of the database you use)
-PORT_APP=3001

In case the Frontend is not running correctly, you must perform the following installations in the client folder:
- "npm i axios"
- "npm i redux-thunk"
- "npm i react-redux"
- "npm i react-router-dom@5.3.0"
- "npm i redux"
- "npm i @material-ui/core"
- "npm i react-router"

I hope you like this API and know that it is always willing to improve
