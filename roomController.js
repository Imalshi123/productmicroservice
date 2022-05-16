const express = require('express');

const router = express.Router();
var _ = require("underscore");
const bcrypt = require('bcrypt');
let Room = require('../models/room')

module.exports = function () {

    //Imlashi
    router.post('/add_room', function (req, res) {
        let RoomData = new Room(req.body);
        RoomData.img = "https://www.collinsdictionary.com/images/full/doubleroom_564885484_1000.jpg"
        RoomData.save()
            .then(Room => {
                var data = {
                    Status: "Sucess",
                    Message: "Room Created Sucessfully"
                }
                res.status(201).send(data);
            }).catch(err => {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            });

    })

    //Imalshi
    router.get('/get_all_rooms', function (req, res) {
      
        Room.find(function (err, dataX) {

            if (!err) {
                var data = {
                    Status: "Sucess",
                    Message: "Retrived All Room Data",
                    data: dataX
                }
                res.status(200).send(dataX);
            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })
    //Imalshi

    router.post('/get_room_dataByID', function (req, res) {
        console.log(req.body)
        Room.find(function (err, dataX) {

            if (!err) {
                var filtered = _.where(dataX, { Room_Name: req.body.id });
                console.log("HU", filtered)
                var data = {
                    Status: "Sucess",
                    Message: "Retrived All Room Data",
                    data: filtered
                }
                res.status(200).send(data);
            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })




    //Imlashi



    router.post('/updateroom', function (req, res) {
        try {
            Room.updateOne({ _id: req.body.id }, { Room_Name: req.body.Room_Name, Room_Type: req.body.Room_Type, Beds: req.body.Beds, Floor: req.body.Floor, Price: req.body.Price }, function (err, docs) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "Room Data Updated"
                    }
                    res.status(200).send(data);
                } else {
                    var data = {
                        Status: "Fail",
                        Message: "Unexpected Error PLease Contact System Admin"
                    }
                    res.status(200).send(data);
                }
            })
        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
            res.status(200).send(data);

        }
    })

    //Imalshi 
    router.post('/RemoveROOm', function (req, res) {
        console.log(req.body, "here")
        try {
            Room.findByIdAndRemove({ _id: req.body.id }, function (err, todo) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "User Deleted"
                    }
                    res.status(200).send(data);
                } else {
                    console.log(req.body, "here2")
                    var data = {
                        Status: "Fail",
                        Message: "Unexpected Error PLease Contact System Admin"
                    }
                    res.status(200).send(data);
                }
            });

        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
            res.status(200).send(data);

        }

    })

    return router;
}