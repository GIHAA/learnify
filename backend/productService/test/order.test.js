import { addordernew ,getOrder,getOrderbtID,updatOrder } from '@/services/product';
import { addorder, getAll, getById, update } from '@/controllers/product';
import { makeResponse } from '@/utils/response';

jest.mock('@/services/order', () => ({
    addordernew: jest.fn(),
    getOrder: jest.fn(),
    getOrderbtID: jest.fn(),
    updatOrder: jest.fn(),
    deleteOrder: jest.fn(),
   
  }));

  jest.mock('@/utils/response', () => ({
    makeResponse: jest.fn()
  }));

  describe('order Controller', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('create - adds a new order and returns success response', async () => {
      const req = { body: {} };
      const res = {};
      addordernew.mockResolvedValue('newOrder');
      await addorder(req, res);
      expect(addordernew).toHaveBeenCalledWith(req.body);
      expect(makeResponse).toHaveBeenCalledWith({
        res,
        data: 'newOrder',
        message: 'order added successfully'
      });
    });

    test('rectrive All order', async() => { 
        
        const req = { query: {} };
      const res = {};
      getOrder.mockResolvedValue('Allorder');
      await getAll(req, res);
      expect(getOrder).toHaveBeenCalledWith(req.query);
      expect(makeResponse).toHaveBeenCalledWith({
        res,
        data: 'Allorder',
        message: 'order retrieved All successfully'
      });
  
     })


    
      test('updates order details and returns success response', async () => {
        const req = {
          params: { id: 'orderid' },
          body: { updatedData: 'newData' }
        };
        const res = {};
    
        updatOrder.mockResolvedValue('updatedorder');
        await update(req, res);
    
        expect(updatOrder).toHaveBeenCalledWith('orderid',  { updatedData: 'newData' });
        expect(makeResponse).toHaveBeenCalledWith({
          res,
          data: 'updatedorder',
          message: 'order updated successfully'
        });
      });

      test('getBy one order using id', async() => { 


        const req = {params : {id : 'orderid'}}
         const res = {};
         
         getOrderbtID.mockResolvedValue('orderByID');

       await  getById(req,res)

         expect(getOrderbtID).toHaveBeenCalledWith('orderid');
         expect(makeResponse).toHaveBeenCalledWith({
          res,
          data: 'orderByID',
          message: 'order retrieved successfully'
        });
        
       })

})