const mongoose = require('mongoose');
const Campground = require('../models/campground');

const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers')

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

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62bb6cc81da5d5a80f10c4e6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            price: price,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum cum accusantium eligendi quis magni veritatis iusto itaque accusamus reiciendis dolorum, laboriosam cumque dolore numquam! Facere architecto quam soluta atque quod.'
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})