const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const UserSchema = mongoose.Schema({
    first_name:String,
    last_name:String,
    address:String

}, 
);
UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
