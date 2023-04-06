 //Declaring constants
 const path = require('path');
 const express = require('express');
 const apiRoutes = require('./Routes/apiRoutes');
 const htmlRoutes = require('./Routes/htmlRoutes');

 const app = express();
 const PORT = process.env.PORT || 3001;

 //Using the routes and middleware
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(express.static('public'));

 app.use('/api', apiRoutes);
 app.use('/', htmlRoutes);

 //Server port
 app.listen(PORT, () => {
    console.log(`API server is on PORT: ${PORT}`)
 });