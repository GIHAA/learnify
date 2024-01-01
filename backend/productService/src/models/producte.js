import mongoose from 'mongoose';

const producteMouble = new mongoose.Schema(
  {
     pID : {
      type : String,
      require : true
     },
     Pname : {
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

const producte = mongoose.model('Producate', producteMouble);

export default producte;
