// This script will insert some regions and one user in the database.
require('dotenv').config();
const mongoose = require('mongoose');
const Region = require('./Region');
const User = require('./User');
const bcrypt = require('bcrypt');

const newRegions = [
    { name: 'Tunisie' },
    { name: 'Monastir' },
    { name: 'Sfax' },
    { name: 'Gabes' },
];

async function insertUser(regions) {
    const users = await User.find();
    if (users.length > 0) {
        console.log('User already inserted');
        return;
    }

    // Insert one user with first region
    const user = new User({
        username: 'alabaganne',
        email: 'alabaganne9@gmail.com',
        CIN: '12345678',
        password: bcrypt.hashSync('password', 10),
        isAdmin: false,
        regionId: regions[0]._id,
    });

    await user.save();

    console.log('User inserted successfully');
    return;
}

async function createAdminUser(regions) {
    const users = await User.find({ isAdmin: true });
    if (users.length > 0) {
        console.log('Admin exists');
        return;
    }

    const user = new User({
        username: 'admin',
        email: 'admin@example.com',
        CIN: '14009654',
        password: bcrypt.hashSync('password', 10),
        isAdmin: true,
        regionId: regions[0]._id,
    });

    await user.save();

    console.log('Admin inserted successfully');
}

async function insertRegions() {
    let regions = await Region.find();
    if (regions.length > 0) {
        console.log('Regions already inserted');

        await insertUser(regions);

        return;
    }

    // Insert records
    await Region.insertMany(newRegions);
    console.log('Regions inserted successfully');
}

async function main() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
    });
    console.log('Connected to MongoDB');

    insertRegions(newRegions);

    let regions = await Region.find();
    await insertUser(regions);
    await createAdminUser(regions);

    return;
}

main();
