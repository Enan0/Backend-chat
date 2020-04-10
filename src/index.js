const db = require('./database');
const app = require('./app');
require('dotenv').config();

const main = ()=>{
    app.listen(app.get('port'));
    console.log(`Server listen at port ${app.get('port')}`);
}

main();