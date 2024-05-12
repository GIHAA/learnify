
import { Button } from '@mui/material';
import CourseGrid from './CourseGrid';
import { Link } from 'react-router-dom';
import { IoArrowForward } from "react-icons/io5";

const OurCourses = () => {

  
  
  return (
    <section className="bg-white rounded-[12px]">
      <section className="lg:max-w-[1440px] max-w-[375px] md:max-w-[688px] mx-auto px-[20px] py-[40px] md:py-[60px] lg:py-[80px] hero-content mb-4">
        <h2 className="text-[28px] leading-[42px] font-semibold md:text-[44px] md:leading-[61px] text-center mb-[38px] md:mb-[48px]">
          Our Courses
        </h2>
        <CourseGrid/>
        <div className=' flex justify-center items-center pt-[30px]'>
        <Button component={Link} to="/shop" variant="contained"  className='text-[18px] flex gap-[8px] bg-[#5E35B1] hover:bg-none'>
          Brows More Courses
          <IoArrowForward />
          </Button> 
        </div>
        
      </section>
    </section>
  );
};

export default OurCourses;
