const Config = require('./config');
const mongoose = require('mongoose');
const router = require('./router');

let dbOnInit = async function (){
    return new Promise(function (resolve,reject){
        try {
            mongoose.connect(`mongodb://${Config.DbConfig.host}:${Config.DbConfig.port}/${Config.DbConfig.db}`, { useNewUrlParser: true });
            console.log("Database Connected");
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}


let init = async function(){
    /**init db */
    await dbOnInit()
    .then(()=>{
        /**init routes */
        router.initRoutes();
    })
    .catch((err)=>{
        console.log("Error connecting to Database",err);
    });
}


/**start */
 init();