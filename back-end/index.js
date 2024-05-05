const express= require('express')
const connection = require('./configs/db')
const bcrypt = require('bcrypt');
const UserModel = require('./models/User.module');
const jwt = require('jsonwebtoken');
const blogRouter = require('./Router/blog.Routes');
const {autentication}= require('./middleware/authentication');
const cors = require('cors');
const app= express();
app.use(express.json());
app.use(cors());
require('dotenv').config();


const main = async ()=>{
    try {
        await connection;
        console.log('connected succesfully')
    } catch (error) {
        console.log(error);
    }
}
main();


app.get('/', (req,res)=>{
    res.send({'app runing u are on home page now ': req.headers});
});



app.post('/signup', async (req,res)=>{
    const { name , email , password} = req.body;

    try {
         const user= await UserModel.findOne({ email : email});
         if(!user){
           bcrypt.hash(password, 4, async function(err, hash) {
           await  UserModel.create({name : name , email : email , password : hash});
           res.send({ msg : ' sign up succusfull ' ,name : name , email : email , password : hash});
        });
    }else{
        res.send('already register')
    }
           
    } catch (error) {
        console.error(error);
        res.send('sign up failed');
    }
}
);



app.post('/login', async (req, res) => {
    const { email, password } = req.body; 
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                throw err;
            }
            if (result) {
                const token = jwt.sign({userId: user._id}, 'secret');
                console.log(result);
                return res.json({ msg: 'Login successful', token});
            } else {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});




// form home page

const BlogModel = require('../back-end/models/Blog.module');
app.get('/blog10', async (req, res) => {
    const { type } = req.query;
    let blogs;
    try {
        if (type) {
            blogs = await BlogModel.find({ type }).limit(10); // Limiting to 10 blogs
        } else {
            blogs = await BlogModel.find().limit(10); // Limiting to 10 blogs
        }
        res.send(blogs);
    } catch(error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});




app.use(autentication);
app.use('/blogs', blogRouter);
  
const Port=process.env.PORT  || 7000;

app.listen(Port, async ()=>{
//   await connection;
console.log(`app runing at port ${Port}`);
})

