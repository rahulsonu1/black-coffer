const mongoose=require('mongoose')

const dataSchema=new mongoose.Schema({   
})

const Data = mongoose.model('Data', dataSchema);

module.exports=Data