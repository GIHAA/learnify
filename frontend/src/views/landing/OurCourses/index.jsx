
import CourseGrid from './CourseGrid';

const OurCourses = () => {
  
  return (
    <section className="bg-white rounded-[12px]">
      <section className="lg:max-w-[1440px] max-w-[375px] md:max-w-[688px] mx-auto px-[20px] py-[40px] md:py-[60px] lg:py-[80px] hero-content mb-4">
        <h2 className="text-[28px] leading-[42px] font-semibold md:text-[44px] md:leading-[61px] text-center mb-[38px] md:mb-[48px]">
          Our Courses
        </h2>
        <CourseGrid/>
      
      </section>
    </section>
  );
};

export default OurCourses;
