import { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Container, CircularProgress } from "@mui/material";
import { DashboardLayout } from "../layout/dashboard-layout";
// import { getClients } from "src/Api/ClientApi";
import { useRouter } from "next/router";

const CustomerListToolbar = dynamic(() => import("src/components/customer/customer-list-toolbar"));

const CustomerListResults = dynamic(() => import("src/components/customer/customer-list-results"), {
  loading: () => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
    </Box>
  ),
});

export default function Customers() {
  const router = useRouter();

  console.log(router.route);
  const [listClient, setListClient] = useState([]);

  return (
    <DashboardLayout>
      <Head>
        <title>Clientes | Template Admin</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults listClient={listClient} />
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
