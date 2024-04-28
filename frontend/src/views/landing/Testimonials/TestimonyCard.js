// import React from 'react';
import client1 from './image/client1.png'

const TestimoniCard = () => {
  return (
    <div className=' max-w-[290px] md:max-w-[512px] lg:max-w-[850px] h-full py-[40px]  px-[35px] bg-white rounded-[20px]  shadow-lg'>
        <div className='flex flex-col justify-between gap-[14px]  items-center'>
            <img src={client1} alt='client-img' height={181} width={181}/>
            <div className='flex flex-col gap-[14px] text-center'>
                <h3 className=' text-[14px] leading-[21px]'  >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse </h3>
                <p className=' text-[16px] leading-[24px] font-semibold  '>Sachini Tharuka</p>
            </div>
        </div>
      
    </div>
  );
};

export default TestimoniCard;