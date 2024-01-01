import mongoose from 'mongoose';

const productMouble = new mongoose.Schema(
  {
     
     pname : {
      type : String,
      require : true
     },

     description :{
      type : String,
      require : true
     },
     price : {
      type : String,
      require : true
     },
     image : {
      type : String,
      require : true
     }
   
    
  },
  {
    versionKey: '__v',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const product = mongoose.model('Producat', productMouble);

export default product;
