import { AiOutlineSchedule } from "react-icons/ai";

const BenefitCard = () => {
  return (
    <div className='p-[26px] max-w-[334px] rounded-[20px] border-dashed border-[2px] hover:border-[#409AE9] flex flex-col gap-[10px]
     bg-white lg:max-w-[405px] md:py-[30px] md:px-[36px]'>
      <div className=' flex justify-between items-center'>
        <AiOutlineSchedule className='text-[#409AE9] text-4xl' />
        <p className=' font-semibold xl:text-[20px] '>Flexible Learning Schedule</p>
        <p className=' text-4xl'>1</p>
      </div>
      <p>
      Fit your coursework around your existing commitments and obligations.
      </p>
    </div>
  );
};

export default BenefitCard;