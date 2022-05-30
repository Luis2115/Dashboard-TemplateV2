import React, { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import { format } from "date-fns";
import * as Yup from "yup";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getTipoDocument } from "src/Api/ClientApi";
import { toast } from "react-toastify";
import { addClient } from "src/Api/ClientApi";
import { DatePickerField, InputField, SelectField } from "src/components/FormFields";

export default function RegisterCustomer() {
  const [listTipoDocument, setListTipoDocument] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      // const documento = await getTipoDocument();
      // setListTipoDocument(documento);
    })();
  }, []);

  function initialValues() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      tipoDocument: "",
      document: "",
      dateNaci: Date.now(),
      phone: "",
      address: "",
    };
  }

  function validationSchema() {
    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const invalidErrorMsgDNI = "El Tipo Documento DNI no puede ser mayor ni menor a 8 digitos";
    const invalidErrorMsgCarnet =
      "El Tipo Documento Carnet de Extranjeria no puede ser mayor ni menor a 12 digitos";
    const invalidErrorMsgPasaporte =
      "El Tipo Documento Pasaporte no puede ser mayor ni menor a 12 digitos";

    return Yup.object({
      email: Yup.string()
        .email("Debe ser un correo electronico valido")
        .max(255)
        .required("Ingrese su correo electronico"),
      firstName: Yup.string().max(255).required("Ingrese su Nombre"),
      lastName: Yup.string().max(255).required("Ingrese sus Apellidos"),
      password: Yup.string().max(255).required("La contraseña es requerida"),
      tipoDocument: Yup.string().required("Seleccione un tipo de documento"),
      document: Yup.string()
        .required("Ingrese su numero de documento")
        .test("lenDNI", `${invalidErrorMsgDNI}`, function (value) {
          const dni = this.options.parent.tipoDocument;
          if (dni === "1" && (value?.length > 8 || value?.length < 8)) {
            return false;
          } else {
            return true;
          }
        })
        .test("lenCarnet", `${invalidErrorMsgCarnet}`, function (value) {
          const carnet = this.options.parent.tipoDocument;
          if (carnet === "2" && (value?.length > 12 || value?.length < 12)) {
            return false;
          } else {
            return true;
          }
        })
        .test("lenPasaporte", `${invalidErrorMsgPasaporte}`, function (value) {
          const pasaporte = this.options.parent.tipoDocument;
          if (pasaporte === "3" && (value?.length > 12 || value?.length < 12)) {
            return false;
          } else {
            return true;
          }
        }),
      dateNaci: Yup.string().required("Ingrese su Fecha de nacimiento"),
      phone: Yup.string()
        .matches(phoneRegExp, "El numero de celular no es valido")
        .required("Ingrese un numero de celular"),

      address: Yup.string().required("Ingrese su direccion"),
    });
  }

  async function _handleSubmit(values, actions) {
    const dataProcess = {
      email: values.email,
      password: values.password,
      date_created: format(Date.now(), "yyyy-MM-dd"),
      nombre: values.firstName,
      apellido: values.lastName,
      tipo_identificacion: values.tipoDocument,
      documento: values.document,
      telef: values.phone,
      direccion: values.address,
      fecha_naci: format(values.dateNaci, "yyyy-MM-dd"),
    };

    console.log(dataProcess);
    // const register = await addClient(dataProcess);
    // if (!register) {
    //   toast.error("Error al registar al cliente");
    // } else {
    //   console.log(register);
    //   toast.success(register.status);
    //   router.push("/customers");
    // }
  }

  return (
    <>
      <Head>
        <title>Registrar Ciente | Template App</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/customers" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Regresar
            </Button>
          </NextLink>
          <Formik
            initialValues={initialValues()}
            validationSchema={validationSchema()}
            onSubmit={_handleSubmit}
          >
            <Form>
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4">
                  Crear nuevo Cliente
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Use el correo electronico para iniciar sesion en el aplicativo movil
                </Typography>
              </Box>

              <Box>
                <InputField
                  name="firstName"
                  label="Nombre"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />

                <InputField
                  name="lastName"
                  label="Apellidos"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />

                <InputField
                  name="email"
                  label="Correo Electronico"
                  margin="normal"
                  type="email"
                  variant="outlined"
                  fullWidth
                />
                <InputField
                  name="password"
                  label="Contraseña"
                  margin="normal"
                  type="password"
                  variant="outlined"
                  fullWidth
                />

                <SelectField
                  name="tipoDocument"
                  label="Tipo Documento"
                  data={listTipoDocument}
                  fullWidth
                  margin="normal"
                />

                <InputField
                  name="document"
                  label="Documento"
                  margin="normal"
                  type="number"
                  variant="outlined"
                  fullWidth
                />

                <DatePickerField
                  name="dateNaci"
                  openTo="day"
                  label="Fecha de nacimiento"
                  views={["day", "month", "year"]}
                />

                <InputField
                  name="phone"
                  label="Celular"
                  margin="normal"
                  type="number"
                  variant="outlined"
                  fullWidth
                />

                <InputField
                  name="address"
                  label="Direccion"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box sx={{ py: 2 }}>
                <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                  Registrar Cliente
                </Button>
              </Box>
            </Form>
          </Formik>
        </Container>
      </Box>
    </>
  );
}
