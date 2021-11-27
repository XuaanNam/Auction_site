const express = require('express');
const multer  = require('multer');
const path = require('path'); 
const dirPath = path.join(__dirname, '../../../../../client'+'public'+'image'+'AVT');

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, dirPath);
    },

    filename: function (req, file, cb) {
        const date = new Date();
        const uniqueSuffix = date.getDate() + '-'+date.getMonth() + '-' + date.getFullYear() + '_' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname));
    }
})

module.exports = storage;