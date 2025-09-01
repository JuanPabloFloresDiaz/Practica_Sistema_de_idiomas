const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const fs = require("fs");
const swaggerDefinition = require("./swaggerDef");

function swaggerDocs(app) {
  if (process.env.NODE_ENV === "development") {
    const routesPath = path.join(__dirname, "../routes/v1");
    const routeFiles = fs
      .readdirSync(routesPath)
      .filter((file) => file.endsWith(".router.js"))
      .map((file) => path.join(routesPath, file));

    const specs = swaggerJsdoc({
      swaggerDefinition,
      apis: routeFiles,
    });

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

    const docsUrl = "http://localhost:5001/api-docs";

    // ANSI color codes
    const green = "\x1b[32m";
    const cyan = "\x1b[36m";
    const blue = "\x1b[34m";
    const underline = "\x1b[4m";
    const reset = "\x1b[0m";

    console.log(`
${green}✅ Swagger habilitado en modo desarrollo${reset}
${cyan}📚 Documentación disponible en:${reset} ${underline}${blue}${docsUrl}${reset}
🌐 Asegúrate de que tu servidor esté corriendo en el puerto correcto.
    `);
  } else {
    const gray = "\x1b[90m";
    const reset = "\x1b[0m";
    console.log(`${gray}⚠️ Swagger no está habilitado (modo producción)${reset}`);
  }
}

module.exports = swaggerDocs;
