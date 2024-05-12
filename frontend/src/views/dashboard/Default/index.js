import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import EarningCard from "./EarningCard";
// import PopularCard from './PopularCard';
import TotalOrderLineChartCard from "./TotalOrderLineChartCard";
import TotalIncomeDarkCard from "./TotalIncomeDarkCard";
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from "store/constant";
import { getDashboard } from "../../../api/paymentService";
import ServiceStatus from "./ServiceStatus";
import { getCourseServiceHealth, getPaymentServiceHealth , getAuthServiceHealth , getEnrollmentServiceHealth } from "api/heathService";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState(0);
  const [income, setIncome] = useState(0);
  const [orders, setOrders] = useState(0);
  const [authServiceHealth, setAuthServiceHealth ] = useState(false);
  const [enrollmentServiceHealth, setEnrollmentServiceHealth ] = useState(false);
  const [courseServiceHealth, setCourseServiceHealth ] = useState(false);
  const [paymentServiceHealth, setPaymentServiceHealth ] = useState(false);



  const fetchData = async () => {
    const dashboardData = await getDashboard();
    setEarnings(dashboardData.data.totalEarnings);
    setIncome(dashboardData.data.totalEarnings);
    setOrders(dashboardData.data.totalOrders);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getCourseServiceHealth();
        setCourseServiceHealth(data);
      }
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
      const data = await getPaymentServiceHealth();
      setPaymentServiceHealth(data);
      }
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
      const data = await getAuthServiceHealth();
      setAuthServiceHealth(data);
      }
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
      const data = await getEnrollmentServiceHealth();
      setEnrollmentServiceHealth(data);
      }
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);


  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} earnings={earnings} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} orders={orders} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isLoading} income={income} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {/* <Grid item xs={12} md={8}>
        <TotalGrowthBarChart isLoading={isLoading} />
        </Grid> */}


        <Grid item sm={6} xs={12} md={4}>
          <ServiceStatus isLoading={isLoading} service="Auth Service" status={authServiceHealth} />
        </Grid>

        <Grid item sm={6} xs={12} md={4}>
          <ServiceStatus isLoading={isLoading} service="Enrollment Service" status={enrollmentServiceHealth} />
        </Grid>

        <Grid item sm={6} xs={12} md={4}>
          <ServiceStatus isLoading={isLoading} service="Course Service" status={courseServiceHealth} />
        </Grid>

        <Grid item sm={6} xs={12} md={4}>
          <ServiceStatus isLoading={isLoading} service="Payment Service" status={paymentServiceHealth} />
        </Grid>

    
      </Grid>
    </Grid>
  );
};

export default Dashboard;
