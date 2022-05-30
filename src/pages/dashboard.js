import { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Container, Grid, CircularProgress } from "@mui/material";
import { DashboardLayout } from "../layout/dashboard-layout";

const LatestAppointments = dynamic(() => import("src/components/dashboard/latest-appointments"), {
  loading: () => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
    </Box>
  ),
});

const LatestClients = dynamic(() => import("src/components/dashboard/latest-clients"), {
  loading: () => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
    </Box>
  ),
});

export default function Dashboard() {
  const [listLastAppoitment, setListLastAppoitment] = useState([]);
  const [listLastClient, setListLastClient] = useState([]);

  useEffect(() => {
    (async () => {
      // const result = await getLastedAppoitment();
      // setListLastAppoitment(result);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // const result2 = await getLastedClient();
      // setListLastClient(result2);
    })();
  }, []);

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Template Admin</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <LatestClients callback={listLastClient} sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestAppointments callback={listLastAppoitment} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
