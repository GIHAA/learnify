import MainCard from "ui-component/cards/MainCard";
import LessionCard from "ui-component/cards/LessionCard";
import Grid from "@mui/material/Grid";
import { useState  } from "react";
import { Button } from "@mui/material";
import ReactPlayer from 'react-player';

const SamplePage = () => {
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
    setSection([ ...section, {
      title: "Introduction to React",
      description: "Lession 1",
      duration: "00:00:00",
      imageUrl:
        "https://media.licdn.com/dms/image/D5622AQEOTHAahyxpfg/feedshare-shrink_800/0/1690448852417?e=2147483647&v=beta&t=yK08dawAbMj79XC8thPDspfk6m0-sv_2ryh1SAjzcKs",
    }]);
  };

  return (
    <MainCard title="Add Course">
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
         <ReactPlayer className="rounded-player" url="https://firebasestorage.googleapis.com/v0/b/ds-project-53aa8.appspot.com/o/videos%2Fgojo2.mp4?alt=media&token=f7787d9f-b982-4725-9e53-d28d9d972dd5" controls={true} width="100%" height="100%" />
        </Grid>
        {/* Right Column */}
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
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default SamplePage;
