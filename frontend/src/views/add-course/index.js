import MainCard from "ui-component/cards/MainCard";
import LessionCard from "ui-component/cards/LessionCard";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Button } from "@mui/material";
// import LinearWithValueLabel from "ui-component/LinearProgressWithLabel";
import BasicModal from "ui-component/BasicModal";
import AddCourseForm from "ui-component/AddCourseForm";
import AddSectionForm from "ui-component/AddSectionForm";

const AddCourse = () => {
  const [metaData, setMetaData] = useState({}); //todo
  const [section, setSection] = useState([]);

  const addSection = (sectionData) => {
    setSection((prevState) => [
      ...prevState,
      {
        id: section.length,
        title: sectionData.title,
        description: sectionData.description,
        duration: sectionData.duration,
        image: sectionData.image,
        video: sectionData.video,
      },
    ]);
  };

  const publishCourse = (isChecked) => {
    if (isChecked) {
      console.log("Notify User on Publish");
    }
    console.log("Course Published");
  };

  return (
    <MainCard title="Add Course">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {!metaData && <AddCourseForm getCourseMetaData={setMetaData} />}
          <AddSectionForm getSectionData={addSection} />
        </Grid>
        <Grid item xs={12} md={4}>
          {section.map((lession , index) => (
            <LessionCard
              key={index}
              title={lession.title}
              description={lession.description}
              duration={lession.duration}
              imageUrl={lession.image}
            />
          ))}
          <div className="flex justify-center">
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "92%",
              }}
              onClick={addSection}
            >
              Add Lession
            </Button>
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
