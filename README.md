# GeoPortal Geo-spatial IoT

🌐 **Live demo:** [geolot.netlify.app](https://geolot.netlify.app)

## Descripción del proyecto

GeoPortal Geo-spatial IoT es una aplicación web frontend orientada al
monitoreo geoespacial de sensores IoT en tiempo real. El objetivo es
construir una interfaz profesional similar a plataformas GIS
industriales, donde un usuario pueda visualizar sensores sobre un mapa,
consultar datos en tiempo real y administrar capas geográficas.

El proyecto está diseñado como portafolio profesional para demostrar
habilidades de desarrollo frontend moderno, arquitectura limpia, consumo
de APIs, mapas interactivos, DevOps y buenas prácticas.

## Objetivos

-   Visualizar sensores IoT ubicados mediante coordenadas GPS/UTM.
-   Mostrar estados en tiempo real.
-   Consumir información desde API REST.
-   Integrar mapas geoespaciales.
-   Implementar arquitectura escalable.
-   Aplicar CI/CD con GitHub Actions y Docker.

# Stack tecnológico

## Frontend

-   React
-   TypeScript
-   Vite
-   Tailwind CSS
-   React Router
-   TanStack Query para manejo de datos remotos
-   Leaflet o Mapbox para visualización GIS
-   Axios para consumo HTTP

## DevOps

-   Docker
-   Docker Compose
-   Git
-   GitHub
-   GitHub Actions

# Arquitectura limpia

La aplicación se divide por responsabilidades:

src/

    src/
     ├── app/
     │    ├── router/
     │    └── providers/
     │
     ├── domain/
     │    ├── entities/
     │    └── models/
     │
     ├── application/
     │    ├── useCases/
     │    └── services/
     │
     ├── infrastructure/
     │    ├── api/
     │    └── adapters/
     │
     ├── presentation/
     │    ├── components/
     │    ├── pages/
     │    └── hooks/
     │
     └── assets/

## Domain

Contiene las reglas del negocio.

Ejemplo:

Sensor:

-   id
-   nombre
-   ubicación
-   estado
-   métricas

## Application

Casos de uso:

-   Obtener sensores
-   Filtrar sensores
-   Obtener detalle del sensor

## Infrastructure

Comunicación externa:

-   API REST
-   Adaptadores
-   Cliente HTTP

## Presentation

Todo lo visual:

-   Componentes React
-   Mapas
-   Paneles
-   Formularios

# Modelo de datos

Ejemplo API:

``` json
{
"id":"SEN-001",
"name":"Estación meteorológica",
"status":"online",
"location":{
"lat":20.39,
"lng":-99.99
},
"metrics":{
"temperature":24.3,
"humidity":58
}
}
```

# Funcionalidades principales

## Dashboard GIS

-   Mapa central
-   Sensores dinámicos
-   Polígonos GeoJSON
-   Capas GIS

## Panel izquierdo

-   Lista de sensores
-   Búsqueda
-   Filtros

## Panel derecho

-   Información del sensor
-   Histórico
-   Métricas

# Flujo de datos

    API REST
       |
    Axios
       |
    Service
       |
    React Query
       |
    Components
       |
    Mapa

# Docker

El proyecto debe ejecutarse mediante contenedores para asegurar
consistencia.

Ejemplo:

docker build

docker compose up

# CI/CD

GitHub Actions realizará:

-   Instalación de dependencias
-   Lint
-   Tests
-   Build
-   Generación de imagen Docker

# Buenas prácticas

-   Componentes reutilizables
-   Código tipado
-   Separación de responsabilidades
-   Variables de entorno
-   Commits convencionales
-   Documentación actualizada

# Objetivo profesional

Este proyecto demuestra conocimientos de:

-   Frontend avanzado
-   Arquitectura
-   GIS
-   IoT
-   APIs
-   Cloud
-   DevOps
CI validated on 2026-06-21
* CI pipeline ready
