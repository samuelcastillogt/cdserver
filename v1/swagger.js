import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express"

const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "CD Quetzal API ", version: "1.0.0"}
    },
    apis: ["v1/routes/blog"]
}
const swaggerSpec = swaggerJSDoc(options)

const SwaggerDocs = (app, port) => {
    app.use("/v1/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec))
}

export default SwaggerDocs