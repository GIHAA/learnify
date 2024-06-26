import { useState, useEffect } from 'react';
import CourseCard from "ui-component/cards/CourseCard";
import { getAllCourses, getChartData } from 'api/courseService';

const CourseGrid = () => {
  const [activeTab, setActiveTab] = useState(null); 
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const fetchCourses = async () => {
    try {
      const response = await getAllCourses();
      setCourses(response.docs);
      
      const uniqueCategories = [...new Set(response.docs.map(course => course.category))];
      setCategories(uniqueCategories);
      
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleTabClick = (category) => {
    setActiveTab(category);
  };

  return (
    <div className="flex lg:max-w-[1280px] flex-wrap mx-auto gap-[20px] justify-center">
      <div className="tabs">
        <div className="tab-header flex gap-[20px] mb-[30px]  justify-center">
          {categories.map(category => (
            <button
              key={category}
              className={`tab ${activeTab === category ? 'active' : ''} py-[13px] px-[13px] rounded-[20px] text-[14px] leading-[21px] font-medium`}
              style={{ backgroundColor: activeTab === category ? '#DEE5FF' : '#F5F3FF' }}
              onClick={() => handleTabClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="tab-content lg:max-w-[1280px] flex flex-wrap gap-[20px] mx-auto justify-center">
          {(activeTab ? courses.filter(course => course.category === activeTab) : courses).map(course => (
            <CourseCard
              key={course._id}
              title={course.title}
              description={course.description}
              image={course.thumbnail} 
              price={course.price}
              rating={course.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseGrid;
