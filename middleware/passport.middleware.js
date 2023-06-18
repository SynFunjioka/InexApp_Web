const passport = require('passport');
const jwt = require('jsonwebtoken');

const { SECRET_TOKEN } = process.env;

const { login } = require('../app/services/auth.service');
const { GetByID } = require('../app/services/user.service');

const authMiddleware = {
    checkToken(req, res, next){
        try {
            const token = req.cookies.userToken; 
            /* req.user= true;
            res.clearCookie('miCookie'); 
            next() */
            console.log('token', token);
            if (!token) {
                req.user = null;
                next();
            }

            let auth = {
                'Authorization': `Bearer ${token}`
            };

            // console.log('cookies token', req.cookies.userToken);
            // Verificar y decodificar el token
            const decoded = jwt.verify(token, SECRET_TOKEN);

            if (!decoded) {
                req.user = null;
                next();
            }

            // Almacenar los datos del usuario en el objeto de solicitud
            req.user = decoded;

            // Continuar con la ejecución de la solicitud
            next();
        } catch (error) {
            console.error('We have problems to authenticate the credentials', error);
            res.clearCookie('userToken');
        }
    },
    
    createCookieOfToken(token) {
        const decodedToken = jwt.verify(token, SECRET_TOKEN);
        const expirationTime = decodedToken.exp;

        const expirationTimeCookie = expirationTime - Math.floor(Date.now() / 1000);
        return ['userToken', { maxAge: expirationTimeCookie * 1000, httpOnly: true }];
    }
}

module.exports = authMiddleware;