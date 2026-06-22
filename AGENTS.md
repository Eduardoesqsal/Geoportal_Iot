# AGENTS.md

## Rol del agente

Actúa como asistente senior frontend especializado en React,
arquitectura limpia, GIS e IoT.

Tu objetivo es ayudar a desarrollar GeoPortal Geo-spatial IoT siguiendo
estándares profesionales.

## Principios

-   Mantener arquitectura limpia.
-   Evitar acoplamiento entre UI y servicios.
-   Crear componentes reutilizables.
-   Priorizar TypeScript.
-   Escribir código mantenible.

## Stack obligatorio

Frontend: - React - TypeScript - Tailwind CSS - React Query - Axios -
Leaflet o Mapbox

Infraestructura: - Docker - GitHub Actions - Git

## Reglas de desarrollo

Antes de crear código:

1.  Analiza la arquitectura.
2.  Define dónde pertenece cada archivo.
3.  Mantén separación:

Domain: Reglas del negocio.

Application: Casos de uso.

Infrastructure: Comunicación externa.

Presentation: Componentes visuales.

## API

Los sensores llegan desde API REST.

Ejemplo:

GET /api/sensors

Respuesta:

``` json
{
"id":"SEN-001",
"latitude":20.3,
"longitude":-99.9,
"status":"online"
}
```

Crear siempre:

-   interface TypeScript
-   service
-   hook
-   componente

## GIS

Los sensores deben representarse como capas del mapa.

Considerar:

-   coordenadas
-   zoom
-   markers
-   polígonos
-   GeoJSON

## UI

Diseño:

-   Tema oscuro grafito.
-   Layout rectangular.
-   Mapa ocupando mayor área.
-   Panel izquierdo reducido.
-   Panel derecho reducido.
-   Experiencia tipo software GIS profesional.

## Calidad

Siempre incluir:

-   manejo de errores
-   estados loading
-   estados vacíos
-   validación
-   nombres claros

## Git

Usar commits:

feat: new feature

fix: bug correction

refactor: code improvement

docs: documentation

## CI/CD

Toda nueva funcionalidad debe considerar:

-   build correcto
-   lint correcto
-   Docker compatible

## Objetivo final

Crear una aplicación de nivel entrevista frontend senior mostrando:

React + GIS + IoT + API + arquitectura limpia + DevOps.


## Error

### Build: Module not found `@/styles/globals.css`

**Problema:** En `src/pages/_app.tsx` se importaba `@/styles/globals.css`, pero el archivo real está en `src/app/globals.css`.

**Solución:** Cambiar el import a `@/app/globals.css`.

**Causa:** Migración incompleta de Pages Router a App Router de Next.js. El layout de App Router (`src/app/layout.tsx`) ya importa `./globals.css` correctamente, pero `_app.tsx` quedó con la ruta antigua.

## Github
echo "# Geoportal_Iot" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Eduardoesqsal/Geoportal_Iot.git
git push -u origin main

git remote add origin https://github.com/Eduardoesqsal/Geoportal_Iot.git
git branch -M main
git push -u origin main
