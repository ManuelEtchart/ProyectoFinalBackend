import dotenv from 'dotenv'
const dotenvConfig = dotenv.config()

const config = {
    mongoDB:{
        url: process.env.MONGODBURL || 'mongodb://localhost:27017/Proyectoprueba'
    },
    Firebase:{
        rutaCert: '../DB/proyectofinalbackend-firebase-adminsdk-mlepy-5afa60846d.json'
    }
}

export default config; 