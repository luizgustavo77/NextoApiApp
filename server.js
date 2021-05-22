const swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('./swagger_output.json');
const express = require('express');
const api = express();

require('rootpath')();
let config = require("./config.json");
let cors = require('cors');
let expressJwt = require('express-jwt');

/*Routes*/
const router = require('express').Router();

api.use(cors());
api.use(express.urlencoded());
api.use(express.json());

//api.use('/api', expressJwt({ secret: process.env.secret || config.secret }).unless({ path: ['/api/usuario/autenticar'] }));
api.use('/api/usuario', require('./controllers/usuario.controller'));
api.use('/api/perfil', require('./controllers/perfil.controller'));
api.use('/api/formulario', require('./controllers/formulario.controller'));
api.use('/api/solicitacao', require('./controllers/solicitacao.controller'));

/* Middlewares */
api.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var apiPort = process.env.PORT || config.port;

var serverAPI = api.listen(apiPort, function () {
    console.log('Server API listening at http://localhost:' + serverAPI.address().port);
    console.log("Server is running!\nAPI documentation: http://localhost:3000/api-doc");
});