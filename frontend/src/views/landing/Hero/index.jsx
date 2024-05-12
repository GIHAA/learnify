import heroImg from './image/heroImg.png'
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';
import './hero.css'

const Hero = () => {
  return (
    <section className='bg-white rounded-[12px]'>
   <section className='lg:max-w-[1440px] max-w-[375px] md:max-w-[688px] mx-auto  px-[20px] py-[40px] md:py-[60px]  lg:py-0 hero-content mb-4'>
    
       <div className='flex flex-col md:flex-row items-center justify-center'>
         <div className='md:w-[50%] lg:max-w-[560px]'>
           <TypeAnimation
      sequence={[
        'Embark on a journey of knowledge with our diverse range of courses.',
        // 1000, // wait 1s before replacing "Mice" with "Hamsters"
        // 'We produce food for Hamsters',
        // 1000,
      ]}
      wrapper="span"
      speed={50}
      style={{  display: 'inline-block' }}
      repeat={false}
      className='text-center md:text-left text-[28px] leading-[42px]  md:text-[32px] lg:text-[54px] lg:leading-[64px] font-bold'
    />
           <p className='text-[16px] leading-[24px] font-medium md:text-[16px] lg:text-[18px] text-[#666666] mt-[10px] md:mt-[20px] text-center md:text-left '>

           Embark on a journey of discovery and growth with our diverse range of expert-led courses. Expand your
            horizons and deepen your expertise in a supportive learning environment. Whether you are starting a new career or enhancing existing skills,
            our comprehensive courses are designed to empower your aspirations.
           </p>
           <div className='mt-[20px] flex justify-center md:justify-start'>
            <Button component={Link} to="/register" variant="contained" color="primary">Get Started</Button> 
           </div>
         </div>
         <div className='md:w-[50%] mt-[20px] md:mt-0'>
           <img src={heroImg} alt='hero' />
         </div>
       </div>       
     
   </section>
   </section>
  );
};

export default Hero;