import PerfectScrollbar from "react-perfect-scrollbar";
import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SeverityPill from "../severity-pill";
import { map } from "lodash";

export default function LatestAppoitments(props) {
  const { callback } = props;

  return (
    <Card {...props}>
      <CardHeader title="Ultima Reserva de Citas" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {map(callback, (appoitment) => (
                <TableRow hover key={appoitment.id}>
                  <TableCell>{appoitment.nombre}</TableCell>
                  <TableCell>{appoitment.fecha}</TableCell>
                  <TableCell>{appoitment.hora}</TableCell>
                  <TableCell>
                    <SeverityPill
                      color={
                        (appoitment.estado === 1 && "success") ||
                        (appoitment.estado === 0 && "error") ||
                        "warning"
                      }
                    >
                      {appoitment.estado === 1 ? "Confirmada" : "Cancelada"}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <NextLink href="/appoitments" passHref>
          <Button
            color="primary"
            endIcon={<ArrowRightIcon fontSize="small" />}
            size="small"
            variant="text"
          >
            Ver Todas
          </Button>
        </NextLink>
      </Box>
    </Card>
  );
}
