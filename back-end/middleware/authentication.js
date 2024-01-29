const jwt = require('jsonwebtoken');

const autentication= (req,res,next)=>{
const token = req.headers.authorization?.split(" ")[1];


if(!token){
   return res.send('login first')
}

jwt.verify(token, 'secret' , (err,decoded)=>{
    console.log(decoded);
})
next();
}

module.exports={autentication};

