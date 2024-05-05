//import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import TestimoniCard from "./TestimonyCard";
import { Box } from "@mui/material";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import './testimoni.css'

export default function TestimonySwiper() {
  return (
    <Box className="App bg-[#DEE5FF] py-[40px] md:py-[60px] lg:py-[80px] rounded-[12px] px-[20px] md:px-0" >
    <Box className="App" maxWidth={1200} margin={"auto"} padding={0} >
     
      <h2 className='text-[28px] text-center leading-[42px] font-semibold md:text-[44px] md:leading-[61px] mb-[24px] md:mb-[40px]'>Testimonials</h2>
  
      {/** Slider main container */}

      <Box  padding={0}>
        <Swiper 
        navigation={true} 
        className="mySwiper flex items-center justify-center content-center" 
        modules={[Navigation]}
        spaceBetween={20}
        alignItems={"center"}
        slidesPerView={1}
        alignContent={"center"}
    
        >
          {/** Slides */}
          <SwiperSlide>
            <TestimoniCard />
          </SwiperSlide>
          <SwiperSlide>
            <TestimoniCard />
          </SwiperSlide>
          <SwiperSlide>
            <TestimoniCard />
          </SwiperSlide>
        </Swiper>
      </Box>
    </Box>
    </Box>
  );
}
