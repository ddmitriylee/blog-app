const router = require('express').Router();
const Blog = require('../models/blogModel');

router.get('/view-posts', async (req, res) => {
    try {
        const posts = await Blog.find({});
        res.render('view-posts', { posts });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/create-post', (req, res) => {
    res.render('create-post', { editMode: false });
});

router.get('/view-post/:id', async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.render('view-post', { post });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/create-post', async (req, res) => {
    try {
        console.log('Received form data:', req.body)

        const newPost = new Blog(req.body);
        const savedPost = await newPost.save();
        res.redirect(`/api/blog/view-post/${savedPost._id}`);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/edit-post/:id', async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);
        res.render('create-post', { post, editMode: true });
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post('/update-post/:id', async (req, res) => {
    try {
        const updatedPost = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect(`/api/blog/view-post/${updatedPost._id}`);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/delete-post/:id', async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);
        if (!post) {
            console.log('Post not found');
            return res.status(404).json({ message: 'Post not found' });
        }

        await Blog.findByIdAndDelete(req.params.id);
        console.log('Post deleted successfully');
        res.redirect('/api/blog/view-posts');
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Error deleting post' });
    }
});



module.exports = router;