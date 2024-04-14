// material-ui
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid'; // Import Grid component from Material-UI
import SearchSection from 'layout/MainLayout/Header/SearchSection';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import BasicCard from 'ui-component/cards/BasicCard';
import { Pagination } from '@mui/material';

const MainCardStyle = styled(MainCard)(() => ({
  '& .MuiCardHeader-root': {
    paddingLeft: '38px',
  },
}));

const onClick = () => {
  //add course
}

const CourseManagementPage = () => (
  <MainCardStyle title="Course Management" onClick={onClick} buttonText={"Add Course"}>
    <SearchSection />

    <Grid container spacing={2} className='mt-[10px]'>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <BasicCard imageUrl={"https://media.licdn.com/dms/image/D5622AQEOTHAahyxpfg/feedshare-shrink_800/0/1690448852417?e=2147483647&v=beta&t=yK08dawAbMj79XC8thPDspfk6m0-sv_2ryh1SAjzcKs"} title={"test"} price={1000}/>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <BasicCard imageUrl={"https://media.licdn.com/dms/image/D5622AQEOTHAahyxpfg/feedshare-shrink_800/0/1690448852417?e=2147483647&v=beta&t=yK08dawAbMj79XC8thPDspfk6m0-sv_2ryh1SAjzcKs"} title={"test"} price={1000}/>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <BasicCard imageUrl={"https://media.licdn.com/dms/image/D5622AQEOTHAahyxpfg/feedshare-shrink_800/0/1690448852417?e=2147483647&v=beta&t=yK08dawAbMj79XC8thPDspfk6m0-sv_2ryh1SAjzcKs"} title={"test"} price={1000}/>
      </Grid>


      <Grid item xs={12} sm={6} md={4} lg={3}>
        <BasicCard imageUrl={"https://media.licdn.com/dms/image/D5622AQEOTHAahyxpfg/feedshare-shrink_800/0/1690448852417?e=2147483647&v=beta&t=yK08dawAbMj79XC8thPDspfk6m0-sv_2ryh1SAjzcKs"} title={"Test"} price={1000}/>
      </Grid>
    </Grid>
    <div className='mt-[40px]' >
          <Pagination count={10} color="primary" />
    </div>
  </MainCardStyle>
);

export default CourseManagementPage;
