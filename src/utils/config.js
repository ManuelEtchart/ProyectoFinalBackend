import dotenv from 'dotenv'
const dotenvConfig = dotenv.config()

const config = {
    mongoDB:{
        url: process.env.MONGODBURL
    },
    Firebase:{
        rutaCert: '../DB/proyectofinalbackend-firebase-adminsdk-mlepy-5afa60846d.json'
    }
}

export default config; 