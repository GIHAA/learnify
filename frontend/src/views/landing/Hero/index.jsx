import heroImg from './image/heroImg.png'
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import './hero.css'

const Hero = () => {
  return (
   <section className='lg:max-w-[1440px] max-w-[375px] md:max-w-[688px] mx-auto  px-[20px] py-[40px] md:py-[60px]  lg:py-0 hero-content '>
    
       <div className='flex flex-col md:flex-row items-center justify-center'>
         <div className='md:w-[50%] lg:max-w-[560px]'>
           <h1 className='text-[24px] md:text-[32px] lg:text-[54px] lg:leading-[64px] font-bold text-[#333333] text-center md:text-left'>The best way to learn</h1>
           <p className='text-[14px] md:text-[16px] lg:text-[18px] text-[#666666] mt-[10px] md:mt-[20px] text-center md:text-left leading-[28px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
           <div className='mt-[20px] flex justify-center md:justify-start'>
            <Button component={Link} to="/pages/register/register3" variant="contained" color="primary">Get Started</Button> 
           </div>
         </div>
         <div className='md:w-[50%] mt-[20px] md:mt-0'>
           <img src={heroImg} alt='hero' />
         </div>
       </div>       
     
   </section>
  );
};

export default Hero;