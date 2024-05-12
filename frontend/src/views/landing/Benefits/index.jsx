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
            <BenefitCard title={"Diverse Course Offerings"} number={"1"} desc={"Explore a wide range of design and development courses covering various topics."}/>
            <BenefitCard title={"Expert Instruction"} number={"2"} desc={"Learn from industry experts who have hands-on experience in design and development."}/>
            <BenefitCard title={"Flexible Learning Schedule"} number={"3"} desc={"Fit your coursework around your existing commitments and obligations."}/>
        </div>
      
    </section>
    </section>
  );
};

export default Benefit;