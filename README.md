# Aplicación de tareas basado en NestJs + MySQL

## Descripción

API para proveer los servicios de la app de tareas y se basa en: 
* NestJs 10.2.1
* NPM 9.2.0
* NODE v18.13.0


### 1. Instalar las dependencias. 
```bash
$ npm install
```

### 2. Configurar variables de entorno
En la raiz del proyecto configurar el fichero
```.development.env``` para el modo desarrollo.

### 3. Correr las migraciones existentes
Para correr las migraciones existentes utilizar el siguiente comando:
```bash
$ npm run m:run
```

## Correr el servidor
Para correr el servidor se debe realizar una correcta configuración de los archivos de entorno.

```bash
# development
$ npm run start

# development mode
$ npm run start:dev
```

## Migraciones

```bash
# generar migraciones
$ npm run m:gen -- ./migrations/nombre-de-la-migracion

# correr las migraciones
$ npm run m:run

# revertir última migración
$ npm run m:revert
```

## Pruebas

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
