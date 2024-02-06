const jwt = require('jsonwebtoken');
const autentication= (req,res,next)=>{
const token = req.headers.authorization?.split(" ")[1];
if(!token){
   return res.send({ "auth" :'login first'})
}

jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    req.headers.userId = decoded.userId;
    next();
});
}

module.exports={autentication};

