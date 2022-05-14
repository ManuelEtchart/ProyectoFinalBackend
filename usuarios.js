import express  from "express";
import { loggerError, logger } from './server.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const usuarios = express.Router();

usuarios.use(cookieParser())
usuarios.use(session({
secret: '123456789!#$%&/()',
resave: false,
saveUninitialized: false,
cookie: {
    secure: 'auto',
    maxAge: 600000
}
}));

usuarios.use(express.json());
usuarios.use(express.urlencoded({extended: true}));


usuarios.get('/login', (req, res) =>{

})

export default usuarios