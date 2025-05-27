# Proyecto Azure - Arquitectura Bad Ice Cream

Este repositorio contiene los componentes principales para la arquitectura del juego **Bad Ice Cream** utilizando servicios de Azure.

## Estructura del repositorio

- **lambda/**  
  Contiene el módulo para crear una **Azure Function**.  
  En este subdirectorio se implementa una función con un **trigger** conectado a una cola de Azure.  
  Cuando un mensaje llega a la cola, la función se dispara automáticamente, valida los datos recibidos y los inserta en una base de datos **Cosmos DB**.

- **prueba-lambda/**  
  Incluye el código necesario para probar la función lambda.  
  Aquí encontrarás ejemplos de cómo enviar mensajes a través de un **Service Bus** y una **cola de Azure** para activar la función y verificar su funcionamiento.

- **cosmos/**  
  Contiene el código para consultar la base de datos **Cosmos DB**.  
  Puedes utilizar este módulo para realizar consultas y verificar los datos almacenados por la función lambda.

## Descripción general

Este repositorio fue creado como parte de la arquitectura del juego **Bad Ice Cream**.  
El flujo principal es el siguiente:

1. Un mensaje es enviado a una cola de Azure (por ejemplo, desde el juego o desde el módulo de pruebas).
2. La **Azure Function** (en `lambda/`) se activa mediante un trigger al detectar el mensaje en la cola.
3. La función valida los datos recibidos.
4. Si los datos son válidos, la función los inserta en la base de datos **Cosmos DB**.
5. El módulo en `cosmos/` permite consultar los datos almacenados para su análisis o verificación.

---

**Nota:** Recuerda configurar correctamente las variables de entorno y los recursos de Azure (colas, Service Bus, Cosmos DB) para que los módulos funcionen correctamente.