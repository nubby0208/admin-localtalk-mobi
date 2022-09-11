const { numbersSchemaModel } = require('../models/NumberModels');
const { generateNumbersUtility } = require('../utils/number.generator');
const MongoClient = require('mongodb').MongoClient;
const urlMongo = "mongodb+srv://Leo:admin2158600@cluster0.93qwz.mongodb.net/admin_panel?retryWrites=true&w=majority";

const checkIfExist = async (numberId) => {
    const number = await userSchemaModel.findOne({ numberId });
    return number || null;
};

exports.numbersList = async (req, res) => {
    const { limit, startIndex } = req.body;
    MongoClient.connect(urlMongo, function (err, db) {
        if (err) throw err;
        var dbo = db.db("admin_panel");
        dbo.collection("numbers").find({isAssigned: false}).limit(limit)
        .skip(startIndex).toArray(function (err, result) {
            if (result.length === 0) {
                res.status(500).send({ error: true, data: [] });
            } else {
                res.send({ error: false, data: result });
            } 
            db.close();
        });
    });
  
    // const numbers = await numbersSchemaModel
    //     .find({ isAssigned: false })
    //     .limit(limit)
    //     .skip(startIndex);

    // if (numbers.length === 0) {
    //     res.status(500).send({ error: true, data: [] });
    // } else {
    //     res.send({ error: false, data: numbers });
    // }
}

exports.availablityCheck = async (req, res) => {
   const { number } = req.body;

    MongoClient.connect(urlMongo, function (err, db) {
        if (err) throw err;
        var dbo = db.db("admin_panel");
        dbo.collection("numbers").findOne({ number, isAssigned: true }, function (err, result) {
            if (err) throw err;
            if (!!result) {
                res.status(500).send({ error: true, data: "number_not_available" });
            } else {
                res.send({ error: false, data: "number_available" });
            }
            db.close();
        });
    });

    // const numbers = await numbersSchemaModel
    //     .findOne({ number, isAssigned: true });

    // if (!!numbers) {
    //     res.status(500).send({ error: true, data: "number_not_available" });
    // } else {
    //     res.send({ error: false, data: "number_available" });
    // }
}

exports.generateNumbers = async (req, res) => {
    console.log(req.body)
    const { length } = req.body;
    const numbers = generateNumbersUtility(length);
    if (numbers.length === 0) {
        res.status(500).send({ error: true, data: [] });
    } else {
        res.send({ error: false, data: numbers });
    }
}