const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
let Product = require('../models/product')
const Axios = require("axios")



async function  infolevellogger(text) {
    const slack = await Axios.post(
        'https://hooks.slack.com/services/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', {
        text: text
    }
    );
}

async function warnlevellogger(text) {
    const slack = await Axios.post(
        'https://hooks.slack.com/services/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', {
        text: text
    }
    );
}


async function generalLevelLogger(text) {
    const slack = await Axios.post(
        'https://hooks.slack.com/services/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', {
        text: text
    }
    );
}

async function fatalLevelLogger(text) {
    const slack = await Axios.post(
        'https://hooks.slack.com/services/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', {
        text: text
    }
    );
}

async function errorlevelLogger(text) {
    const slack = await Axios.post(
        'https://hooks.slack.com/services/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', {
        text: text
    }
    );
}

function getTimeStamp() {
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // prints date in YYYY-MM-DD format


    // prints date & time in YYYY-MM-DD HH:MM:SS format
    return (year + "-" + month + "-" + date + " at " + hours + ":" + minutes + ":" + seconds);
}


module.exports = function () {

    //Imlashi
    router.post('/add-product', function (req, res) {
        let product_data = new Product(req.body);
        product_data.Product_Image = "https://www.collinsdictionary.com/images/full/doubleroom_564885484_1000.jpg"
        product_data.save()
            .then(Product => {
                var data = {
                    Status: "Sucess",
                    Message: "Product Created Sucessfully"
                }
               // generalLevelLogger("Product Created Sucessfully" + " TimeStamp :" + getTimeStamp())
                res.status(201).send(data);
            }).catch(err => {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
             //   errorlevelLogger("Unexpected Error PLease Contact System Admin " + err + " TimeStamp :" + getTimeStamp())
                res.status(200).send(data);
            });

    })

    //Imalshi
    router.get('/get-product', function (req, res) {
      
        Product.find(function (err, dataX) {

            if (!err) {
                var data = {
                    Status: "Sucess",
                    Message: "Retrived All Room Data",
                    data: dataX
                }
            //    generalLevelLogger("Retrived All Room Data" + " TimeStamp :" + getTimeStamp())
                res.status(200).send(dataX);
            } else {
                var data = {
                    Status: "Fais",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
              //  errorlevelLogger("Unexpected Error PLease Contact System Admin " + err + " TimeStamp :" + getTimeStamp())
                res.status(200).send(data);
            }
        })
    })
    //Imalshi

    router.post('/get-product-by-id', function (req, res) {
        console.log(req.body)
        Product.find(function (err, dataX) {

            if (!err) {
                var filtered = _.where(dataX, { Room_Name: req.body.id });
                console.log("HU", filtered)
                var data = {
                    Status: "Sucess",
                    Message: "Retrived All Room Data",
                    data: filtered
                }
              //  generalLevelLogger("Retrived All Room Data" + " TimeStamp :" + getTimeStamp())
                res.status(200).send(data);
            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
//errorlevelLogger("Unexpected Error PLease Contact System Admin " + err + " TimeStamp :" + getTimeStamp())
                res.status(200).send(data);
            }
        })
    })




    //Imlashi



    router.post('/update-product', function (req, res) {
        try {
            Product.updateOne({ _id: req.body.id }, { Room_Name: req.body.Room_Name, Room_Type: req.body.Room_Type, Beds: req.body.Beds, Floor: req.body.Floor, Price: req.body.Price }, function (err, docs) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "Room Data Updated"
                    }
                  //  generalLevelLogger("Email Already Exists In The Database" + " TimeStamp :" + getTimeStamp())
                    res.status(200).send(data);
                } else {
                    var data = {
                        Status: "Fail",
                        Message: "Room Data Updated"
                    }
                 //   errorlevelLogger("Unexpected Error PLease Contact System Admin " + err + " TimeStamp :" + getTimeStamp())
                    res.status(200).send(data);
                }
            })
        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
           // errorlevelLogger("Unexpected Error PLease Contact System Admin " + err + " TimeStamp :" + getTimeStamp())
            res.status(200).send(data);

        }
    })

    //Imalshi 
    router.post('/remove-product', function (req, res) {
        console.log(req.body, "here")
        try {
            Product.findByIdAndRemove({ _id: req.body.id }, function (err, todo) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "User Deleted"
                    }
                  //  generalLevelLogger("User Deleted" + " TimeStamp :" + getTimeStamp())
                    res.status(200).send(data);
                } else {
                    console.log(req.body, "here2")
                    var data = {
                        Status: "Fail",
                        Message: "Unexpected Error PLease Contact System Admin"
                    }
                  //  errorlevelLogger("Unexpected Error PLease Contact System Admin " + err + " TimeStamp :" + getTimeStamp())
                    res.status(200).send(data);
                }
            });

        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
          //  errorlevelLogger("Unexpected Error PLease Contact System Admin " + err + " TimeStamp :" + getTimeStamp())
            res.status(200).send(data);

        }

    })

    return router;
}