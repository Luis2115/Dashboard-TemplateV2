import { useState, useEffect } from "react";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { map } from "lodash";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const BasicModal = dynamic(() => import("../modal/BasicModal"));
const BasicDialog = dynamic(() => import("../dialog/BasicDialog"));

export default function CustomerListResults(props) {
  const { listClient } = props;
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(+event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Tipo Documento</TableCell>
                  <TableCell>Documento</TableCell>
                  <TableCell>Celular</TableCell>
                  <TableCell>Direccion</TableCell>
                  <TableCell>Fecha de Nacimiento</TableCell>
                  {/* <TableCell>Acciones</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {map(listClient.slice(page * limit, page * limit + limit), (client) => (
                  <TableRow hover key={client.id}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {client.nombre}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{client.apellido}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.identificacion_name}</TableCell>
                    <TableCell>{client.documento}</TableCell>
                    <TableCell>{client.telef}</TableCell>
                    <TableCell>{client.direccion}</TableCell>
                    <TableCell>{client.fecha_naci}</TableCell>
                    {/* <TableCell>
                      <Options document={client.documento} idClient={client.id} />
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        page={page}
        count={listClient.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Filas por página"
      />
    </Card>
  );
}

function Options({ document, idClient }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const ITEM_HEIGHT = 30;

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  //Estados para controlar el modal
  const [showModal, setShowModal] = useState(false);
  const onShowModal = () => setShowModal(true);

  //Estado para controlar el dialog
  const [openDialog, setOpenDialog] = useState(false);
  const onShowDialog = () => setOpenDialog(true);

  const actionAccept = () => {
    console.log("eliminar de la bd");
    setOpenDialog(false);
  };

  const buttonDelete = {
    color: "red",
    border: `1px solid red`,
    "&:hover": {
      color: "white",
      backgroundColor: "red",
      border: `1px solid red`,
    },
    label: { textTransform: "none" },
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "15ch",
          },
        }}
      >
        <NextLink href={`/detail-customer/${document}`} passHref>
          <MenuItem onClick={handleClose}>
            <Button component="a">Ver Informacion</Button>
          </MenuItem>
        </NextLink>
        <MenuItem onClick={handleClose}>
          <Button fullWidth sx={buttonDelete} onClick={onShowDialog} component="a">
            Eliminar
          </Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button onClick={onShowModal}>Agregar Vehiculos</Button>
        </MenuItem>
      </Menu>
      <BasicModal show={showModal} setShow={setShowModal} title="Añadir Vehiculos">
        <UpdateClient idClient={idClient} />
      </BasicModal>
      <BasicDialog
        show={openDialog}
        setShow={setOpenDialog}
        actionAccept={actionAccept}
        title="Desea dar de baja al cliente?"
      >
        <Typography>
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
        </Typography>
      </BasicDialog>
    </>
  );
}

function UpdateClient(props) {
  const { idClient } = props;
  return <h1>{idClient}</h1>;
}
