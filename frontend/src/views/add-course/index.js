import MainCard from 'ui-component/cards/MainCard';
import Grid from '@mui/material/Grid';

const SamplePage = () => (
  <MainCard title="Add Course">
    <Grid container spacing={2}>
      {/* Left Column */}
      <Grid item xs={12} md={8}>
        dynamic content goes here
      </Grid>
      {/* Right Column */}
      <Grid item xs={12} md={4}>
       list of lessions goes here
      </Grid>
    </Grid>
  </MainCard>
);

export default SamplePage;
