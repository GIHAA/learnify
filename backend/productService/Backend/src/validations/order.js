import { Joi } from 'celebrate';

export const  orderRequestAdd = {
    orderPersonName : Joi.string().required() ,
    oitemName :Joi.string(),
    itemNumber :Joi.string(),
    orderAdress : Joi.string(),
    orderPhone : Joi.string(),
    oEmail : Joi.string().email().required()
    
};

export const producrRequestAdd ={

    
}
