import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express"
const options = {
    definition: {
        openapi: "3.0.1",
        info: { title: "CD Quetzal API ", version: "1.0.0"},
        servers: [
            {
              "url": "http://localhost:4000"
            },
            {
              "url": "https://cdserver-r54a.vercel.app/"
            }
          ],
        tags: [
            {
              "name": "User",
              "description": "User Manager"
            },
            {
                "name": "Blog",
                "description": "Blog"
            },
            {
                "name": "Business",
                "description": "Business API"
            },
        ],
        paths: {
            "/v1/user/login": {
              "post": {
                "tags": ["User"],
                "summary": "Alive signal for kubernetes",
                "requestBody": {
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/login"
                        }
                      }
                    }
                  },
                "responses": {
                  "200": {
                    "description": "OK",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/respondeLogin"
                        }
                      }
                    }
                  }
                }
              }
            },
            "/v1/user/check": {
                "post": {
                  "tags": ["User"],
                  "summary": "Alive signal for kubernetes",
                  "requestBody": {
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/login"
                          }
                        }
                      }
                    },
                  "responses": {
                    "200": {
                      "description": "OK",
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/respondeLogin"
                          }
                        }
                      }
                    }
                  }
                }
            },
            "/v1/blog": {
                "get": {
                  "tags": ["Blog"],
                  "summary": "Response all post of blogger API",
                  "responses": {
                    "200": {
                      "description": "OK",
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/respondeBlog"
                          }
                        }
                      }
                    }
                  }
                }
            },
            "/v1/business": {
                "get": {
                  "tags": ["Business"],
                  "summary": "Get All business data",
                  "responses": {
                    "200": {
                      "description": "OK",
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/allBusiness"
                          }
                        }
                      }
                    }
                  }
                }
            },
            "/v1/business/edit/{id}": {
                "get": {
                  "tags": ["Business"],
                  "summary": "Get All business data",
                  "responses": {
                    "200": {
                      "description": "OK",
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/allBusiness"
                          }
                        }
                      }
                    }
                  }
                }
            },
        },
        components:{
            schemas:{
                login: {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string",
                        "example": "ejemplo@gmail.com"
                      },
                      "pass": {
                        "type": "string",
                        "example": "Prueba123"
                      }
                    }
                },
                respondeLogin: {
                    "type": "object",
                    "properties": {
                      "token": {
                        "type": "string",
                        example: "lkjdlsajduyasdakjhñua"
                      },
                    }
                },
                respondeBlog: {
                    "type": "object",
                    "properties": {
                      "data": {
                        "type": "object",
                        example: [{
                            "url": "http://cdquetzal.blogspot.com/2023/05/jura-la-bandera-de-guatemala-para.html",
                            "title": "Jura a la bandera de Guatemala 【 Para imprimir 】"
                            }]
                      },
                    }
                },
                allBusiness: {
                    "type": "object",
                    "properties": {
                      "data": {
                        "type": "object",
                        example: [{
                            "id": "Du2cElRdUegMItNsydo42kBJ6jm2",
                            "data": {
                            "nombre": "Mariachis cristianos Sinai",
                            "imagen": "https://firebasestorage.googleapis.com/v0/b/directorio-bc73c.appspot.com/o/img-post%2Fmariachi%20cristiano%20guatemala.jpg?alt=media&token=2bf7c155-0257-4fe9-ade0-9ebe0556813d",
                            "descripcion": "Autentico Mariachi Cristiano en Guatemala, el mejor y el unico 100% cristiano. Con mas de 30 años de experiencia alabando al señor con la musica del autentico mariachi mexicano. Tel: 5790-8231",
                            "categoria": "Musicos",
                            "direccion": "Guatemala, Guatemala",
                            "lat": "14.69378351158993",
                            "lng": "-90.5841314792633"
                            }
                            }]
                      },
                    }
                },
            }
        }        
    },
    apis: ["v1/routes/blog"]
}
const swaggerSpec = swaggerJSDoc(options)

const SwaggerDocs = (app, port) => {
    app.use("/v1/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec))
}

export default SwaggerDocs