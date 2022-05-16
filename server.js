const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const ProductController = require('./controllers/productController');
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


dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 9000;
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
    
    useNewUrlParser: true,
    useUnifiedTopology: true,

}, (error) => {
    if (error) {
        console.log('Database Error : ', error.message);
        errorlevelLogger('Database Error: ' + error.message + " TimeStamp :" + getTimeStamp())
    }
});
app.use(express.static('./public'))
mongoose.connection.once('open', () => {
    console.log('Database Connection Sucessfull For Micro Service Product Management');
    warnlevellogger('Database Connection Sucessfull For Micro Service Product Management: '  + " TimeStamp :" + getTimeStamp())
});
app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
    warnlevellogger(`Micro Service Product Controller Server is up and running on PORT ${PORT}` + " TimeStamp :" + getTimeStamp())
});
app.use('/product', ProductController());