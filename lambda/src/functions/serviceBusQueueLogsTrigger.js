const { app } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos');

// Variables de entorno (defínelas en Azure → Configuración → Variables de entorno)
const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const databaseId = 'cosmicworks';
const containerId = 'bad-ice-cream-logs';

// Inicializar cliente de Cosmos DB
const cosmosClient = new CosmosClient({ endpoint, key });
const container = cosmosClient.database(databaseId).container(containerId);

// Función que se ejecuta al recibir un mensaje del Service Bus
app.serviceBusQueue('serviceBusQueueLogsTrigger', {
  connection: 'ServiceBusConnectionString',
  queueName: 'log-queue',
  handler: async (message, context) => {
    context.log('📨 Mensaje recibido del Service Bus:', message);

    const userId = message.body.userId;

    if (!message.body.userId) {
        context.log.error('❌ El mensaje no contiene un userId válido.');
        return;
    }

    try {
        const logEntry = {
            id: message.body.logId, // id único para Cosmos
            userId, // campo de partición obligatorio
            timeStamp: message.body.timeStamp,
            hostIp: message.body.hostIp,
            destinationIp: message.body.destinationIp,
            service: message.body.service,
            subject: message.subject,
        };
        const result = await container.items.create(logEntry);
        context.log(`✅ Log insertado correctamente en Cosmos DB con ID: ${result.resource.id}`);
    } catch (error) {
        context.log.error('❌ Error al insertar el log en Cosmos DB:', error.message);
    }
  }
});
