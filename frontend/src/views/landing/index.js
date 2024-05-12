import Benefit from "./Benefits";
import FAQ from "./FAQ";
import Hero from "./Hero";
import OurCourses from "./OurCourses";
import TestimonySwiper from "./Testimonials";


const Landing = () => {
  return (
    <div className="  rounded-[12px]">
        <Hero/>
        <Benefit/>
        <OurCourses/>
        <TestimonySwiper/>
        <FAQ/>
    </div>
  );
};

export default Landing;
