const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index.ejs', {campgrounds: campgrounds});
})

app.get('/campgrounds/:id', async (req, res) => {
    const {id} = req.params;
    const camp = await Campground.findById(id)
    res.render('campgrounds/show', {camp: camp})
})

app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('/makedb', async (req, res) => {
    const firstCamp = new Campground({
        title: 'lazycorner',
        price: 'gunstig',
        description: 'good',
        location: 'at home'
    });

    await firstCamp.save();
    res.send(firstCamp);
})

app.listen(3000, () => {
    console.log('Serving on port 3000');
})