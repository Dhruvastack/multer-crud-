const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const UserSchema = mongoose.Schema({
    first_name:String,
    last_name:String,
    address:String

}, 
{timestamps:true});
UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
