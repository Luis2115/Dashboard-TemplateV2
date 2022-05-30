import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { map } from "lodash";

export default function LatestClients(props) {
  const { callback } = props;

  return (
    <Card {...props}>
      <CardHeader title="Ultimos Clientes Registrados" />
      <Divider />
      <List>
        {map(callback, (client, i) => (
          <ListItem divider={i < callback.length - 1} key={client.id}>
            <ListItemText
              primary={client.nombre + " " + client.apellido}
              secondary={`Registrado el ${client.date_created}`}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <NextLink href="/customers" passHref>
          <Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text">
            Ver Todos
          </Button>
        </NextLink>
      </Box>
    </Card>
  );
}
