import { base_host } from "../Config/Constants";
import axios from "axios";
import { getToken } from "./TokenApi";

export async function getClients() {
  const url = `${base_host}/client/listClient`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  //console.log(result.data);
  return result.data;
}

export async function addClient(data) {
  const url = `${base_host}/client/register`;

  const result = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": `application/json`,
    },
  });

  return result.data;
}

export async function getClientDocument(document) {
  const url = `${base_host}/client/document/${document}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  //console.log(result.data);
  return result.data;
}

export async function registerCita(data) {
  const url = `${base_host}/client/add-reserva-cita`;

  const result = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": `application/json`,
    },
  });

  return result.data;
}

export async function fetchHistory(idClient) {
  const url = `${base_host}/client/history/${idClient}`;

  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return result.data;
}

export async function addClinicalHistory(data) {
  const url = `${base_host}/client/add-clinical-history`;

  const result = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": `application/json`,
    },
  });

  return result.data;
}

export async function getLastedClient() {
  const url = `${base_host}/client/dashboard/lastClient`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  //console.log(result.data);
  return result.data;
}

export async function getTipoDocument() {
  try {
    const url = `${base_host}/client/tipo-document`;
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
