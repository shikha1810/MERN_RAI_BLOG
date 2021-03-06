const authRoutes = require('express').Router();
const Auth = require('../controller/Auth');
const { verifyToken , getUser } = require('../configure/AuthMid');
//const verifyToken = require('../configure/AuthMid');

authRoutes.get('/test' , (req, res)=>{
    res.status(200).send({ message : "auth routes recieved and working"});
});

authRoutes.post('/signup' , Auth.signup );
authRoutes.post('/signin' , Auth.signin );
authRoutes.get('/verify_jwt' ,verifyToken, getUser, Auth.verifyJwt );

module.exports = authRoutes;
