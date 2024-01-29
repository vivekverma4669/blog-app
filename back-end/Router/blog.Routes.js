const express= require('express');
const blogRouter = express.Router();
const BlogModel = require('../models/Blog.module');
const UserModel = require('../models/User.module');
blogRouter.use(express.json());
const jwt =require('jsonwebtoken');



blogRouter.get('/', async (req,res)=>{
    const blogs = await BlogModel.find();

    res.send( {"getting blogs" : blogs});

});


blogRouter.post('/create', async (req,res)=>{
  const { title, content } = req.body;
  const userId = req.headers.userId;

 console.log(userId) 
console.log(req.headers);
  try {
    // Find the user based on the provided email
    const user = await UserModel.findOne({ _id: userId });
    jwt.verify()
    if (!user) {
      return res.status(401).json({ msg: 'Unauthorized' }); // User not found
    }

    // Create the blog with the user's email
    const blog = await BlogModel.create({ title, content, auth_email: userEmail });
    res.status(201).json({ msg: 'Blog created successfully', blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});



blogRouter.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
      const updatedBlog = await BlogModel.findByIdAndUpdate(id, { title, content }, { new: true });

      if (!updatedBlog) {
          return res.status(404).json({ message: 'Blog not found' });
      }

      res.json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});



blogRouter.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const deletedBlog = await BlogModel.findByIdAndDelete(id);

      if (!deletedBlog) {
          return res.status(404).json({ message: 'Blog not found' });
      }

      res.json({ message: 'Blog deleted successfully', blog: deletedBlog });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = blogRouter;