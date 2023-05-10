require('./connection');

const Region = require('./Region');

const newRegions = [
    { name: 'Tunisie' },
    { name: 'Monastir' },
    { name: 'Sfax' },
    { name: 'Gabes' },
];

async function initRegions() {
    // Check if there is regions in the database
    let regions = await Region.find();
    if (regions.length > 0) {
        console.log('Records already exist');
        return;
    }

    // Insert records
    await Region.insertMany(newRegions);
    console.log('Regions inserted successfully');
}
initRegions();
