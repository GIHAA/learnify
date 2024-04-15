import MainCard from "ui-component/cards/MainCard";
import LessionCard from "ui-component/cards/LessionCard";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Button, TextField, Avatar } from "@mui/material";
// import ReactPlayer from "react-player/lazy";
import { VideoPlayer } from "@graphland/react-video-player";
import InputFileUpload from "ui-component/form-components/InputFileUpload";
import LinearWithValueLabel from "ui-component/LinearProgressWithLabel";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BasicModal from "ui-component/BasicModal";

const AddCourse = () => {
  const [section, setSection] = useState([
    {
      title: "Introduction to React",
      description: "Lession 1",
      duration: "00:00:00",
      imageUrl:
        "https://media.licdn.com/dms/image/D5622AQEOTHAahyxpfg/feedshare-shrink_800/0/1690448852417?e=2147483647&v=beta&t=yK08dawAbMj79XC8thPDspfk6m0-sv_2ryh1SAjzcKs",
    },
  ]);

  const addSection = () => {
    setSection([
      ...section,
      {
        title: "Introduction to React",
        description: "Lession 1",
        duration: "00:00:00",
        imageUrl:
          "https://media.licdn.com/dms/image/D5622AQEOTHAahyxpfg/feedshare-shrink_800/0/1690448852417?e=2147483647&v=beta&t=yK08dawAbMj79XC8thPDspfk6m0-sv_2ryh1SAjzcKs",
      },
    ]);
  };

  const publishCourse = (isChecked) => {
    if (isChecked) {
      console.log("Notify User on Publish");
    }
    console.log("Course Published");
  };

  const videoSources = [
    {
      src: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      type: "video/mp4",
    },
    // Add more video sources as needed
  ];

  const videoProps = {
    theme: "city", // 'city', 'fantasy', 'forest', 'sea'
    height: 720,
    width: 1280,
    autoPlay: false,
    loop: false,
    sources: videoSources,
    controlBar: {
      skipButtons: {
        forward: 5,
        backward: 5,
      },
    },
    playbackRates: [0.5, 1, 1.5, 2],
    disablePictureInPicture: false,
    onReady: () => {
      console.log("Video player is ready!");
    },
  };


  return (
    <MainCard title="Add Course">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <div className="mx-2">
            {/* <ReactPlayer
              className="rounded-player"
              url="https://firebasestorage.googleapis.com/v0/b/ds-project-53aa8.appspot.com/o/videos%2Fgojo2.mp4?alt=media&token=f7787d9f-b982-4725-9e53-d28d9d972dd5"
              controls={true}
              width="100%"
              height="auto"
            /> */}
            <VideoPlayer {...videoProps} />
          </div>
          <div className="ml-2">
            <LinearWithValueLabel />
          </div>

          <InputFileUpload
            text="Upload Video"
            className=" flex justify-center m-2"
          />

          <div className="mr-4">
            <TextField
              id="outlined-multiline-flexible"
              label="Multiline"
              multiline
              maxRows={6}
              className="w-full mt-5 m-2 "
            />
          </div>

          <div className="mr-4">
            <Button
              variant="contained"
              color="primary"
              className="m-2 w-full flex justify-center mr-4 "
            >
              Add Text Area{" "}
            </Button>
          </div>

          <div className="mx-2 mt-6">
            <Grid container spacing={2}>
              <Grid item xs={6} >
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  id="outlined-basic"
                  label="Duration"
                  variant="outlined"
                  fullWidth
                  className="mt-5"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  fullWidth
                />

                <div className="mt-[34px] ml-[20px]">
                  <Grid container spacing={2} justifyContent="space-between">
                    <Avatar
                      variant="rounded"
                      className="w-[50px] mt-1 h-[50px]"
                    >
                      <AssignmentIcon />
                    </Avatar>
                    <Avatar
                      variant="rounded"
                      className="w-[50px] mt-1 h-[50px]"
                    >
                      <AssignmentIcon />
                    </Avatar>
                    <Avatar
                      variant="rounded"
                      className="w-[50px] mt-1 h-[50px]"
                    >
                      <AssignmentIcon />
                    </Avatar>
                    <Avatar
                      variant="rounded"
                      className="w-[50px] mt-1 h-[50px]"
                    >
                      <AssignmentIcon />
                    </Avatar>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          {section.map((lession) => (
            <LessionCard
              key={lession.title}
              title={lession.title}
              description={lession.description}
              duration={lession.duration}
              imageUrl={lession.imageUrl}
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
