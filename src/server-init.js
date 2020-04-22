'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');

module.exports.startServer = async () => {
    // Express.js configuration.
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Root endpoint.
    app.get('/', (req, res) => {
        res.status(200).json('Hello world');
    });

    // Setup all the application routes here.
    app.use('/api/product', require('./routes/product'));

    // Error handling middleware.
    app.use((err, req, res, next) => {
        res.status(500).json({ message: 'Unexpected error', err: err });
    });

    // Database connection.
    await mongoose.connect(process.env.DB_CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('error', function (e) {
        throw e;
    });

    return app;
};