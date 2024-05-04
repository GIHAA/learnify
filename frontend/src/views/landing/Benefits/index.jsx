import BenefitCard from './singleBenefitCard';

const Benefit = () => {
  return (
    <section className=' bg-[#DEE5FF] rounded-[12px] mb-[10px]'>
    <section className='lg:max-w-[1440px] max-w-[375px] md:max-w-[688px] mx-auto 
      py-[40px] md:py-[60px] flex flex-col gap-[15px] md:gap-[30px] justify-center items-center  px-[20px] md:px-[0]'>
        <div className=' text-center max-w-[335px] md:max-w-[551px]'>
            <h2 className='text-[28px] leading-[42px] font-semibold md:text-[44px] md:leading-[61px]'>Benefits</h2>
            <p className='text-[16px] leading-[24px] font-medium'>Elevate Your Learning Experience: Dive into the Wealth of Benefits Our Platform Offers to Fuel Your Educational Journey</p>
        </div>
        <div className='md:max-w-[688px] lg:max-w-[1280px] flex flex-wrap gap-[20px] md:gap-[10px] lg:gap-[20px] justify-center'>
            <BenefitCard/>
            <BenefitCard/>
            <BenefitCard/>
        </div>
      
    </section>
    </section>
  );
};

export default Benefit;