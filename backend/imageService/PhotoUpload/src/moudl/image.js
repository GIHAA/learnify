import mongoose from 'mongoose'

const imageSchema =new mongoose.Schema({

    image:{
        type : String,
        required: true,
        unique: true
    },
   
})

const image = mongoose.model('Product',imageSchema)

export default image