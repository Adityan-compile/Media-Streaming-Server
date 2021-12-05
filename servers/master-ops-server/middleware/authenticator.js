const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_KEY } = process.env;

module.exports = {
    authenticate: async (req,res,next)=>{
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if(!token) return res.status(401).json({
            status: 401,
            message: "Authorization Credentials Required"
        });

        try {
            const decodedUser = await jwt.verify(token, ACCESS_TOKEN_KEY);
            req.user = decodedUser;
        }catch(e){
            return res.status(401).json({
                status: 401,
                message: "Token Invalid"
            });
        }
            return next();

    },
};