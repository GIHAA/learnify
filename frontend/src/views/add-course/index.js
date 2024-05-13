import MainCard from "ui-component/cards/MainCard";
import LessionCard from "ui-component/cards/LessionCard";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import BasicModal from "ui-component/BasicModal";
import AddCourseForm from "ui-component/AddCourseForm";
import AddSectionForm from "ui-component/AddSectionForm";
import { createCourse } from "api/courseService";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { notify } from "api/authService";
import toast from "react-hot-toast";


const AddCourse = () => {
  const [metaData, setMetaDataDetails] = useState(); 
  const [section, setSection] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user)


  const addSection = (sectionData) => {
    setSection((prevState) => [
      ...prevState,
      {
        id: section.length,
        title: sectionData.title,
        description: sectionData.description,
        duration: sectionData.duration,
        icon: sectionData.image,
        video: sectionData.video,
        image : sectionData.image,
        type : sectionData.type
      },
    ]);
  };


  const setMetaData = (data) => {
    console.log(data);
    setMetaDataDetails(data);
  }

  const publishCourse = async (isChecked) => {
    const res = await notify({
      subject: "New Course Published",
      text : `${metaData.title} has been published successfully`,
    })
    console.log(res);
    
    await createCourse({ ...metaData, addedBy: user.user.name, content: section });
    if (isChecked) {

      toast.success("Course Published Successfully");
    }
    navigate("/admin/course-management");
  };

  return (
    <MainCard title="Add Course">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {!metaData && <AddCourseForm getCourseMetaData={setMetaData} />}
          {metaData && <AddSectionForm getSectionData={addSection} /> }
        </Grid>
        <Grid item xs={12} md={4}>
          {section.map((lession , index) => (
            <LessionCard
              index={index}
              key={index}
              title={lession.title}
              description={lession.title}
              duration={lession.duration}
              imageUrl={lession.image}
            />
          ))}
          <div className="flex justify-center">
          </div>

          <BasicModal
            onClick={publishCourse}
            checkBox={true}
            text="Publish Course"
            conClassName="flex justify-center"
            className=" w-[92%] mt-4 text-white bg-green-500 hover:bg-green-700"
            btnText="Publish Course"
            btnClassName="w-full mt-4 "
          />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default AddCourse;
