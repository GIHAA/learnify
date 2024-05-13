import { AiOutlineSchedule } from "react-icons/ai";
import PropTypes from "prop-types";

const BenefitCard = ({title, number ,desc}) => {
  return (
    <div className='p-[26px] max-w-[334px] rounded-[20px] border-dashed border-[2px] hover:border-[#409AE9] flex flex-col gap-[10px]
     bg-white lg:max-w-[405px] md:py-[30px] md:px-[36px]'>
      <div className=' flex justify-between items-center'>
        <AiOutlineSchedule className='text-[#409AE9] text-4xl' />
        <p className=' font-semibold xl:text-[20px] '>{title}</p>
        <p className=' text-4xl'>{number}</p>
      </div>
      <p>
      {desc}
      </p>
    </div>
  );
};

export default BenefitCard;

BenefitCard.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
};