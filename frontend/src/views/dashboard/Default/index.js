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

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState(0);
  const [income, setIncome] = useState(0);
  const [orders, setOrders] = useState(0);

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
          <ServiceStatus isLoading={isLoading} service="Auth Service" status="running" />
        </Grid>

        <Grid item sm={6} xs={12} md={4}>
          <ServiceStatus isLoading={isLoading} service="Auth Service" status="running" />
        </Grid>
        <Grid item sm={6} xs={12} md={4}>
          <ServiceStatus isLoading={isLoading} service="Auth Service" status="running" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
