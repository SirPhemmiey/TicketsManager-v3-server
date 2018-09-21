import jwt from 'jsonwebtoken';

const isLoggedIn = (req, res, next) => {
    //check the body of the request or header or query params for token
    const token =
    req.body.token || req.headers['x-access-token'] || req.query.token
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err);
                return res.json({
                    message: 'Please login first',
                    success: false
                });
            } else {
                //if everything is fine, save to request for use in other routes
                req.decodedToken = decodedToken;
                req.user = decodedToken;
                next();
            }
        });
    }
    else {
        res.json({
            message: 'Unauthorized! Sorry, you have to login first'
        });
    }
}
export default isLoggedIn;