import Release from './models/release.model.js'
import Illustration from './models/illustration.model.js'
import sequelize from './dbconfig.js';


await sequelize.sync();
await Release.create({
    title: 'Memorix',
    description: 'My butterfly',
    year: 2024,
});

await Illustration.create({
    title: 'Memorix',
    description: 'My butterfly',
    path: 'path/to/image',
});

console.log("Seed inserted!");
process.exit();
