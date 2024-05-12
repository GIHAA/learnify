import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IoMdCheckmarkCircle } from "react-icons/io";
import data from './data'


function FAQ() {
  return (
    <section className='bg-white rounded-[12px] '>
    <section className='lg:max-w-[1440px] max-w-[375px] md:max-w-[688px] mx-auto  px-[20px] py-[40px] md:py-[60px]  lg:py-[80px] hero-content  my-[10px]'>
      <div>
      <h2 className='text-[28px] leading-[42px] font-semibold md:text-[44px] md:leading-[61px] text-center mb-[38px] md:mb-[48px]'> Frequently asked questions</h2>
      <div className='lg:max-w-[886px] md:max-w-[688px] mx-auto flex flex-col gap-[20px]'>
        {data.map((item, index) => (
          <Accordion className=' ' key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className=' text-[20px]  leading-[28px] md:text-[24px] md:leading-[33px] font-medium'
            >
              <div className='flex max-w-fit gap-[10px] justify-center items-center'>
              <IoMdCheckmarkCircle className='text-[#409AE9] ' />
              {item.question}
              </div>
            </AccordionSummary>
            <AccordionDetails className=' text-[15px]  leading-[24px]'>
              {item.answer}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      </div>
    </section>
    </section>
  );
}

export default FAQ;