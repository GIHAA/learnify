import {
    getCourseServiceHealth,
    getPaymentServiceHealth,
    getAuthServiceHealth,
    getEnrollmentServiceHealth,
  } from "api/heathService";
import { useState , useEffect } from "react";
import { Grid} from '@mui/material';
import ServiceStatus from "./ServiceStatus";
  

const ServiceStatusGroup = () => {

    const [authServiceHealth, setAuthServiceHealth] = useState(false);
    const [enrollmentServiceHealth, setEnrollmentServiceHealth] = useState(false);
    const [courseServiceHealth, setCourseServiceHealth] = useState(false);
    const [paymentServiceHealth, setPaymentServiceHealth] = useState(false);

  
    useEffect(() => {
      try {
        const fetchData = async () => {
          const data = await getCourseServiceHealth();
          setCourseServiceHealth(data);
        };
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
        };
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
        };
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
        };
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }, []);


  return (
    <>
      <Grid className="w-full" item >
        <ServiceStatus
          isLoading={false}
          service="Auth Service"
          status={authServiceHealth}
        />
      </Grid>

      <Grid item  >
        <ServiceStatus
          isLoading={false}
          service="Enrollment Service"
          status={enrollmentServiceHealth}
        />
      </Grid>

      <Grid item  >
        <ServiceStatus
          isLoading={false}
          service="Course Service"
          status={courseServiceHealth}
        />
      </Grid>

      <Grid item  >
        <ServiceStatus
          isLoading={false}
          service="Payment Service"
          status={paymentServiceHealth}
        />
      </Grid>

      <Grid item  >
        <ServiceStatus
          isLoading={false}
          service="Feedback Service"
          status={paymentServiceHealth}
        />
      </Grid>
    </>
  );
};


export default ServiceStatusGroup;