const {Schema,model} = require('mongoose');

const mensajeSchema = new Schema({
    emisor:{
        type:String,
        required:true
    },
    receptor:{
        type:String,
        required:true
    },
    mensaje:{
        type:String,
        default:""
    }
},{
    timestamps:false
});

module.exports = model("mensajes",mensajeSchema);