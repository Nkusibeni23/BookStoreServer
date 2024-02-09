import { name } from "ejs";
import { Router } from "express";
import { serve, setup } from "swagger-ui-express";

const docrouter = Router();

const options = {
  openapi: "3.0.1",
  info: {
    title: "Book store APIs documentation",
    version: "1.0.0",
    description: "book store APIs documentation",
  },
  basePath: "/api",
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    { name: "Authontication", description: "" },
    { name: "Users", description: "Users" },
    { name: "Book", description: "Book" },
    { name: "Order", description: "Order" },


  ],
  paths: {
    "/api/v1/auth/login": {
      post: {
        tags: ["Authontication"],
        summary: "Login a user",
        description: "Login a user",
        operationId: "loginUser",
        security: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                email: "admin@gmail.com",
                password: "admin",
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "User logged in successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },


    "/api/v1/users/signup": {
      post: {
        tags: ["Users"],
        summary: "Add a customer/Book admin",
        description: "Add a user",
        operationId: "addcustomerorrestadmin",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                username: "John",
                email: "test@example.com",
                password: "1234",
              
             
              },
            },
            required: true,
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },



    "/api/v1/Book/add": {
      post: {
        tags: ["Book"],
        summary: "Add a Book",
        description: "Add a Book",
        operationId: "addBook",
        requestBody: {
          content: {
            "application/json": {
          
              example: {
                title: "storybook",
                writer: "kamana",
                tags: ["social"],
                point: "5",
               
              },
            },
            required: true,
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Book/": {
      get: {
        tags: ["Book"],
        summary: "Get a book",
        description: "Get a book",
        operationId: "getOnebook",
    
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Book/delete/{id}": {
      delete: {
        tags: ["Book"],
        summary: "delete a book",
        description: "delete a book",
        operationId: "deleteOnebook",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Book's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
  
    //   put: {
    //     tags: ["Book"],
    //     summary: "Update a Book",
    //     description: "Update a Book",
    //     operationId: "updateOneBook",

    //     requestBody: {
    //       content: {
    //         "application/json": {
    //           schema: {
    //             $ref: "#/components/schemas/Book",
    //           },
    //           // example: {
    //           //   firstname: "John",
    //           //   lastname: "Doe",
    //           //   email: "test@example.com",
    //           //   phone: "08012345678",
    //           // },
    //         },
    //       },
    //     },
    //     responses: {
    //       200: {
    //         description: "Book updated successfully",
    //       },
    //       400: {
    //         description: "Bad request",
    //       },
    //       401: {
    //         description: "Unauthorized",
    //       },
    //       404: {
    //         description: "User not found",
    //       },
    //       500: {
    //         description: "Something went wrong",
    //       },
    //     },
    //   },
    // },
    "/api/v1/Book/one/{id}": {
      get: {
        tags: ["Book"],
        summary: "Get a Book",
        description: "Get a Book",
        operationId: "getOneBook",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Book's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },



    "/api/v1/Order/add/{id}": {
      post: {
        tags: ["Order"],
        summary: "Add a Order",
        description: "Add a Book",
        operationId: "addOrder",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Book's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        responses: {
          201: {
            description: "Order created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Order/approve/{id}": {
      put: {
        tags: ["Order"],
        summary: "Add a approve",
        description: "approve order",
        operationId: "approveOrder",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "order's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        responses: {
          201: {
            description: "Order approved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Order/reject/{id}": {
      put: {
        tags: ["Order"],
        summary: "reject a Order",
        description: "rejecting order",
        operationId: "rejectOrder",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "order's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        responses: {
          201: {
            description: "Order rejected successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/Order/": {
      get: {
        tags: ["Order"],
        summary: "all  a Orders",
        description: " order",
        operationId: "all orders",
      
      
        responses: {
          201: {
            description: "Order retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Order/delete/{id}": {
      delete: {
        tags: ["Order"],
        summary: "delete a Order",
        description: "delete order",
        operationId: "deleteOrder",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "order's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        responses: {
          201: {
            description: "Order rejected successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Order/one/{id}": {
      get: {
        tags: ["Order"],
        summary: "get one  a Order",
        description: "customer/admin get one order order",
        operationId: "getOrder",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "order's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        responses: {
          201: {
            description: "Order retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },



   




  },

  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          username: {
            type: "string",
            description: "User's username",
          },
         
          role: {
            type: "string",
            description: "User's role",
          },
    
          email: {
            type: "string",
            description: "User's email",
          },
          password: {
            type: "string",
            description: "User's password",
          },
          password: {
            type: "string",
            description: "User's ponts",
          },

        },
      },
      Book: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "Book title",
          },
          writer: {
            type: "string",
            description: "Book writer",
          },
          tags: {
            type: "string",
            description: "Book's tags",
          },
          image: {
            type: "string",
            description: "books's cover image",
            format: "binary",
          },
          point: {
            type: "string",
            description: "Book's point",
          },
          point: {
            type: "string",
            description: "Book's status",
          },

        },
      },
      orders: {
        type: "object",
        properties: {
          userid: {
            type: "string",
            description: "user s id",
          },
          bookid: {
            type: "string",
            description: "book id",
          },
          userid: {
            type: "string",
            description: "user id",
          },
          date: {
            type: "string",
            description: "order  date",
          },
          times: {
            type: "string",
            description: "order  times",
          },
          status: {
            type: "string",
            description: "book's status",
          },

        },
      },


    
    },

    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

docrouter.use("/", serve, setup(options));

export default docrouter;
