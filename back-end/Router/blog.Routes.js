express= require('express');
const blogRouter = express.Router();
const BlogModel = require('../models/Blog.module');
const UserModel = require('../models/User.module');
blogRouter.use(express.json());
const jwt =require('jsonwebtoken');



blogRouter.get('/', async (req,res)=>{
  const { type } = req.query;
  let blogs;
  try {
      if (type) {
          blogs = await BlogModel.find({ type });
      } else {
          blogs = await BlogModel.find();
      }
      res.send(blogs);
    }
    catch(error){
      console.log(error);
    }
});

blogRouter.get('/my', async (req, res) => {
  const { type } = req.query;
  const userId = req.headers.userId;

  try {
      let blogs;

      if (type) {
          blogs = await BlogModel.find({ type, user_id: userId });
      } else {
          blogs = await BlogModel.find({ user_id: userId });
      }

      res.send(blogs);
  } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
  }
});


blogRouter.post('/create', async (req, res) => {
  const { title, content, type , imageUrl} = req.body;
  const userId = req.headers.userId;
  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const blog = await BlogModel.create({ title, content, auth_email: user.email, user_id: user._id, type, imageUrl });
    res.status(201).json({ msg: 'Blog created successfully', blog });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});


blogRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const Blog = await BlogModel.find({_id : id});
      if (!Blog) {
          return res.status(404).json({ message: 'Blog not found' });
      }
      res.json(Blog);
  }
  catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
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
