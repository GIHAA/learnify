//import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import TestimoniCard from "./TestimonyCard";
import { Box, Typography } from "@mui/material";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import './testimoni.css'

export default function TestimonySwiper() {
  return (
    <Box className="App bg-[#DEE5FF]" >
    <Box className="App" maxWidth={1200} margin={"auto"} padding={10} >
      <Typography variant={"h4"} align={"center"} fontWeight={700}>
        Testimonials
      </Typography>
      {/** Slider main container */}

      <Box marginTop={4}>
        <Swiper 
        navigation={true} 
        className="mySwiper flex items-center justify-center content-center p-10" 
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerGroup={1}
        alignItems={"center"}
    
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
