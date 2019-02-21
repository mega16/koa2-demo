const mongoose = require('./db');
const Schema = mongoose.Schema;

const ceshiSchema = new Schema({
    email: String,
    name: String,
    password: String
});

const MyModel = mongoose.model('User', ceshiSchema);

class Userdb {
    constructor(){}

    query(obj={}){
        return new Promise((resolve, reject) => {
            MyModel.find(obj, (err, res) => {
                if(err){
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    queryEmail (em){
        return new Promise((resolve, reject) => {
            MyModel.find({email: em}, (err, res) => {
                if(err){
                    reject(err);
                }
                const len = res.length;
                if(len >= 1){
                    resolve(res);
                }else {
                    resolve(null);
                }
            });
        });
    }

    save(obj){
        const m = new MyModel(obj);
        return new Promise((resolve, reject) => {
            m.save((err, res) => {
                if(err){
                    reject(err)
                }
                resolve(res);
                console.log(res);
            });
        });
    }
}


module.exports = new Userdb();