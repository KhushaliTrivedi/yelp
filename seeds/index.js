const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:("));
db.once("open", () => {
    console.log("Database Connected!");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '6337f4de74e00efc084b1ad1',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{
                    url: 'https://res.cloudinary.com/daydkxqmx/image/upload/v1664973163/YelpCamp/albxtzhwnczsri1n4kgm.jpg',
                    filename: 'YelpCamp/albxtzhwnczsri1n4kgm',
                },
                {
                    url: 'https://res.cloudinary.com/daydkxqmx/image/upload/v1664973163/YelpCamp/unnaxln57281qfyhrv2c.jpg',
                    filename: 'YelpCamp/unnaxln57281qfyhrv2c',
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore odio beatae quam ipsa, unde rem, veniam expedita accusamus sunt, voluptatibus cum impedit autem molestias corporis sequi iusto voluptas ut nam!',
            price,
            geometry: {type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude]}
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})