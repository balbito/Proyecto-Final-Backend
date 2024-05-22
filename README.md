#### README - LANGUAGE: Español

# Proyecto Final del Curso de Programación Backend - CoderHouse

La idea del proyecto final es crear un ecommerce desde cero utilizando node.js, express y handlebars.

## Descrpcion del Proyecto

El proyecto consiste en la creación de un ecommerce completo, que permite a los usuarios navegar por diferentes categorías de productos, agregar productos al carrito de compras, realizar pedidos y realizar pagos. El frontend está implementado utilizando el motor de plantillas Handlebars, mientras que el backend está construido con Node.js utilizando Express.js.

## Características Principales

- **Navegación de Productos**: Los usuarios pueden explorar diferentes categorías de productos y ver los detalles de cada producto.
- **Carrito de Compras**: Los usuarios pueden agregar productos al carrito de compras, ver el resumen del carrito y proceder al proceso de pago.
- **Proceso de Pedido**: Los usuarios pueden completar el proceso de pedido ingresando su información de envío y método de pago.
- **Integración de pago**: El proyecto cuenta con integración de pago utilizando una pasarela de pago externa (Stripe).


## Roles de Usuarios y Credenciales

La aplicacion cuenta con distintos roles para los usuarios:

- **Admin**: Tiene todos los permisos permitidos dentro de la app, estos son crear, eliminar y actualizar productos. También gestionar usuarios cambiando su rol (user a premium o viceversa) y borrarlos. Gestionar carritos y tickets. Las credeciales del administrador son:

     - Email: adminCoder@coder.com
     - Contraseña: 123qwe

- **User**: Realiza el proceso de compra completo.

- **Premium**: Realiza el proceso de compra completo y ademas puede crear, editar y borrar sus propios productos.

## Instalación

Clona este proyecto.
```bash
  git clone https://github.com/balbito/Proyecto-Final-Backend
```
Instala las dependencias:
```bash
  npm install
```
Inicia el servidor
```bash
  npm start
```

## Envio de Correos Elecrtronicos

Para este servicio de envio de correo electronicos se utilizo Nodemailer.

- A los usuarios premium cuando se elimina uno de sus productos
- A los usuarios borrados por inactividad.
- Cuando se finaliza la compra con toda la informacion de la misma
- Para reestablecer contraseña si el usuario la ha olvidado. 


## Documentación Y Testing

Se han realizado pruebas de rendimiento y tests unitarios y de integración mediante mocha, chai y supertest. Además, la documentación de la API está disponible en Swagger en el endpoint /api/docs, donde se pueden probar todos los endpoints (se requieren credenciales de administrador para muchos de ellos).

#### README - LANGUAGE: English

# Final Project of the Backend Programming Course - CoderHouse

The idea of the final project is to create an ecommerce from scratch using node.js, express and handlebars.

## Project Description

The project consists in the creation of a complete ecommerce, which allows users to browse different product categories, add products to the shopping cart, place orders and make payments. The frontend is implemented using Handlebars template engine, while the backend is built with Node.js using Express.js.

## Key Features.

- **Product Navigation**: Users can browse different product categories and view the details of each product.
- **Shopping Cart**: Users can add products to the shopping cart, view cart summary and proceed to checkout.
- **Order Process**: Users can complete the order process by entering their shipping information and payment method.
- **Payment Integration**: The project has payment integration using an external payment gateway (Stripe).


## User Roles and Credentials

The application has different roles for users:

- **Admin**: Has all the permissions allowed within the app, these are create, delete and update products. Also manage users by changing their role (user to premium or vice versa) and delete them. Manage carts and tickets. The credentials of the administrator are:

     - Email: adminCoder@coder.com
     - Password: 123qwe

- **User**: Performs the complete purchase process.

- **Premium**: Performs the complete purchase process and can also create, edit and delete your own products.

## Installation

Clone this project.
```bash
  git clone https://github.com/balbito/Proyecto-Final-Backend
```
Install the dependencies:
```bash
  npm install
```
Start the server
```bash
  npm start
```

## Sending E-Mails

Nodemailer was used for this email service.

- To premium users when one of their products is deleted.
- To users deleted due to inactivity.
- When the purchase is finalized with all the information of the same one.
- To reset password if the user has forgotten it. 


## Documentation and Testing

Performance, unit and integration tests have been performed using mocha, chai and supertest. In addition, API documentation is available in Swagger at the /api/docs endpoint, where all endpoints can be tested (administrator credentials are required for many of them).

