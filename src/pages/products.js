import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { v4 as uuid } from "uuid";
import Head from "next/head";
import { Box, Container, Grid, Pagination, CircularProgress } from "@mui/material";
import { DashboardLayout } from "src/layout/dashboard-layout";
import { size } from "lodash";

const listproducts = [
  {
    id: uuid(),
    createdAt: "27/03/2019",
    description:
      "Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.",
    media: "/static/images/products/product_1.png",
    title: "Dropbox",
    totalDownloads: "594",
  },
  {
    id: uuid(),
    createdAt: "31/03/2019",
    description:
      "Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.",
    media: "/static/images/products/product_2.png",
    title: "Medium Corporation",
    totalDownloads: "625",
  },
  {
    id: uuid(),
    createdAt: "03/04/2019",
    description:
      "Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.",
    media: "/static/images/products/product_3.png",
    title: "Slack",
    totalDownloads: "857",
  },
  {
    id: uuid(),
    createdAt: "04/04/2019",
    description: "Lyft is an on-demand transportation company based in San Francisco, California.",
    media: "/static/images/products/product_4.png",
    title: "Lyft",
    totalDownloads: "406",
  },
  {
    id: uuid(),
    createdAt: "04/04/2019",
    description: "GitHub is a web-based hosting service for version control of code using Git.",
    media: "/static/images/products/product_5.png",
    title: "GitHub",
    totalDownloads: "835",
  },
  {
    id: uuid(),
    createdAt: "04/04/2019",
    description:
      "Squarespace provides software as a service for website building and hosting. Headquartered in NYC.",
    media: "/static/images/products/product_6.png",
    title: "Squarespace",
    totalDownloads: "835",
  },
];

const ProductListToolbar = dynamic(() => import("../components/product/product-list-toolbar"), {
  loading: () => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
    </Box>
  ),
});
const ProductCard = dynamic(() => import("../components/product/product-card"));

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    (async () => {
      if (size(searchStr) > 0) {
        console.log("entrando por busquedad de productos");
        // const response = await searchProductApi(searchStr);
        // console.log(response);
        // if (size(response) > 0) setProducts(response);
        // else setProducts([]);
        // fetch the item in the listproducts and return the full object with the id

        const response = listproducts.filter((product) => {
          return product.title.toLowerCase().includes(searchStr.toLowerCase());
        });

        if (size(response) > 0) setProducts(response);
        else setProducts([]);
      } else {
        setProducts(listproducts);
      }
    })();
  }, [searchStr]);

  return (
    <DashboardLayout>
      <Head>
        <title>Productos | Dashboard Template</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar callback={setSearchStr} />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item key={product.id} lg={4} md={6} xs={12}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
