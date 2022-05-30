import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useFormik, Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Card, CardContent, TextField, Typography } from "@mui/material";
import { loginPersonal } from "src/Api/UserApi";
import { toast } from "react-toastify";
import { TOKEN } from "src/Config/Constants";
import Cookies from "js-cookie";
import { InputField } from "src/components/FormFields";
import { setToken } from "src/Api/TokenApi";

export default function LoginForm() {
  const router = useRouter();

  function initialValues() {
    return {
      email: "",
      password: "",
    };
  }

  function validationSchema() {
    return Yup.object({
      email: Yup.string()
        .email("Ingrese un correo valido")
        .max(255)
        .required("Este campo es requerido"),
      password: Yup.string().max(255).required("La contraseña es necesaria"),
    });
  }

  function _handleSubmit(values, actions) {
    console.log(values);
    // setTimeout(async () => {
    //   const response = await loginPersonal(values);

    //   if (response?.jwt) {
    //     toast.success("Inicio de sesion Correcto");
    //     Cookies.set(TOKEN, response.jwt);
    //     router.push("/dashboard");
    //     setToken(response.jwt);
    //   } else {
    //     toast.error("Usuario incorrecto");
    //   }
    // }, 500);

    router.push("/dashboard");
  }

  return (
    <>
      <Head>
        <title>Login | SEGAS Login</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
          backgroundImage: `url(${"/static/images/dashboard-background.jpg"})`,
          // backgroundImage: `url(${"https://res.cloudinary.com/reymi/image/upload/v1651620934/dashboard-background_d3afvg.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="sm">
          <Card>
            <CardContent>
              <Formik
                initialValues={initialValues()}
                validationSchema={validationSchema()}
                onSubmit={_handleSubmit}
              >
                <Form>
                  <Box sx={{ my: 3 }}>
                    <Typography color="textPrimary" variant="h4">
                      Inicia sesión
                    </Typography>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      Inicia sesión en el Plataforma Admin
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      my: 3,
                    }}
                  >
                    <Typography align="center" color="textSecondary" variant="body1">
                      Inicie sesión con la dirección de correo electrónico
                    </Typography>
                  </Box>

                  <InputField
                    name="email"
                    label="Correo electronico"
                    margin="normal"
                    variant="outlined"
                    type="email"
                    fullWidth
                  />

                  <InputField
                    name="password"
                    label="Contraseña"
                    margin="normal"
                    variant="outlined"
                    type="password"
                    fullWidth
                  />

                  <Box sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Iniciar Sesión
                    </Button>
                  </Box>
                </Form>
              </Formik>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
