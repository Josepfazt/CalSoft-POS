Estrategia de Gestión de Versiones
Proyecto
CalSoft POS, sistema web para la gestión administrativa y punto de venta de un restaurante.

Estrategia seleccionada
El equipo utiliza una adaptación simplificada de GitFlow para organizar el desarrollo, la integración y la publicación de versiones.

Ramas
main
Contiene las versiones estables y publicadas del sistema.

develop
Funciona como rama de integración para los cambios terminados y revisados.

feature/*
Permite desarrollar funcionalidades, refactorizaciones y documentación de forma aislada.

Ejemplos:

feature/documentacion-t3
feature/refactor-autenticacion
feature/modulo-reportes
hotfix/*
Se reserva para correcciones urgentes detectadas en una versión estable.

Flujo de trabajo
Actualizar la rama develop.
Crear una rama feature desde develop.
Realizar cambios pequeños y verificables.
Registrar los cambios mediante commits descriptivos.
Publicar la rama en GitHub.
Crear un Pull Request hacia develop.
Revisar y aprobar el Pull Request.
Fusionar develop en main para publicar una versión.
Crear un tag y una Release.
Convención de commits
Se utiliza una convención basada en Conventional Commits:

feat: nueva funcionalidad.
fix: corrección.
refactor: mejora interna sin alterar la funcionalidad.
docs: documentación.
test: pruebas.
chore: configuración o mantenimiento.
Versionamiento semántico
Las versiones siguen el formato MAJOR.MINOR.PATCH:

MAJOR: cambios incompatibles.
MINOR: nuevas funcionalidades compatibles.
PATCH: correcciones compatibles.
La primera versión estable del proyecto será identificada como v1.0.0.
