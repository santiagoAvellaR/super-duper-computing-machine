import { ServiceBusClient } from "@azure/service-bus";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid"; // Importar uuid

dotenv.config();

const queueName = process.env.SERVICE_BUS_QUEUE_NAME;
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING;

if (!connectionString) {
  throw new Error("No se encontró la variable SERVICE_BUS_CONNECTION_STRING");
}

async function sendMessage() {
  const sbClient = new ServiceBusClient(connectionString);
  const sender = sbClient.createSender(queueName);

  // Generar valores aleatorios para logId y userId
  const logId = Math.floor(Math.random() * 1000).toString();
  const userId = uuidv4();
  console.log("userId:", userId);
  const message = {
    body: {
      logId,
      userId,
      hostIp: "110.123.12.3",
      destinationIp: "100.2.7.3",
      service: "game",
      timeStamp: new Date().toISOString(),
    },
    contentType: "application/json",
    subject: "Movimiento del jugador",
  };
  console.log("Mensaje a enviar:", message);

  try {
    console.log("Enviando mensaje...");
    await sender.sendMessages(message);
    console.log("✅ Mensaje enviado correctamente");
  } catch (err) {
    console.error("❌ Error al enviar el mensaje:", err);
  } finally {
    await sender.close();
    await sbClient.close();
  }
}

sendMessage();
