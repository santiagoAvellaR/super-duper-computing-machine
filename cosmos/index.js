require('dotenv').config();
const { CosmosClient } = require("@azure/cosmos");
// Usa tus valores de Azure
const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;

const client = new CosmosClient({ endpoint, key });

const databaseId = "cosmicworks";
const containerId = "bad-ice-cream-logs";

async function runQuery() {
    const database = client.database(databaseId);
    const container = database.container(containerId);

    const querySpec = {
        query: "SELECT * FROM c WHERE c.userId = @userId",
        parameters: [
            { name: "@userId", value: "1" }
        ]
    };

    const { resources: results } = await container.items.query(querySpec).fetchAll();

    for (const item of results) {
        console.log(endpoint);
        console.log(`Item encontrado: ${JSON.stringify(item)}`);
    }
}

runQuery().catch(err => {
    console.error("Error ejecutando la consulta: ", err);
});
