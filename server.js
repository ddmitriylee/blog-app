const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const methodOverride = require('method-override');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.set('Content-Type', 'application/json');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const blogRoute = require('./routes/blogRoute');
app.use('/api/blog', blogRoute);

mongoose.connect('mongodb://localhost:27017/blogsdb')
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error(error));

app.get('/', (req, res) => {
    res.redirect('/api/blog/view-posts')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})