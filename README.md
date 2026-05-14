<div align="center">

<img width="220" src="https://cdn-icons-png.flaticon.com/512/2830/2830284.png" />

# 🇲🇽 FactuCom SAT

### Sistema de facturación electrónica y gestión comercial CFDI 4.0 🚀

<p align="center">
  <b>FactuCom SAT</b> es una plataforma moderna para la administración de productos, ventas, usuarios y facturación electrónica compatible con el SAT de México y CFDI 4.0.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/API-REST-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/SAT-CFDI_4.0-006847?style=for-the-badge">
</p>

<p align="center">
  <a href="#-acerca-del-proyecto">Acerca</a> •
  <a href="#-características">Características</a> •
  <a href="#-api-rest">API</a> •
  <a href="#-instalación">Instalación</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

</div>

---

# 🌌 Acerca del proyecto

**FactuCom SAT** es un sistema backend diseñado para gestionar procesos comerciales y administrativos mediante una API REST moderna compatible con la facturación electrónica CFDI 4.0 del SAT.

El sistema permite:

- 📦 Gestión de productos
- 🧾 Registro de ventas
- 👥 Administración de usuarios
- 💰 Control de precios
- 📊 Gestión de inventario
- 🔐 Seguridad y autenticación
- ⚡ APIs RESTful
- 🇲🇽 Compatibilidad SAT CFDI

El proyecto fue desarrollado para practicar:

- Desarrollo backend
- APIs REST
- Arquitectura MVC
- CRUDs empresariales
- Bases de datos relacionales
- Facturación electrónica

---

# ✨ Características

## 📦 Gestión de productos

- 📋 CRUD completo
- 🏷️ Marca y modelo
- 💰 Precios de compra y venta
- 📦 Control de stock
- 🔍 Consulta individual y masiva

---

## 🧾 Gestión de ventas

- 🛒 Registro de ventas
- 👤 Datos del cliente
- 💵 Descuentos por producto
- 📅 Fechas SQL
- 📦 Productos dinámicos JSON
- 📝 Notas adicionales

---

## 👥 Gestión de usuarios

- 🔐 Registro de usuarios
- 🏢 Empresas asociadas
- 📧 Gestión de correos
- 🔒 Contraseñas cifradas
- 👨‍💻 Administración del sistema

---

## ⚡ API REST

- 🌐 Endpoints RESTful
- 📄 Respuestas JSON
- 🔄 Métodos GET, POST, PATCH y DELETE
- 📦 Arquitectura escalable
- 🚀 Alto rendimiento

---

# 🛠️ Tecnologías utilizadas

## 🌐 Backend

<p>
  <img src="https://skillicons.dev/icons?i=nodejs,express,js" />
</p>

- Node.js
- Express
- JavaScript
- REST API

---

## 🗄️ Base de datos

<p>
  <img src="https://skillicons.dev/icons?i=mysql" />
</p>

- MySQL
- SQL
- Modelado relacional

---

## 🐳 Herramientas

<p>
  <img src="https://skillicons.dev/icons?i=git,github,docker,vscode" />
</p>

- Git
- GitHub
- Docker
- VS Code

---

# 📂 Estructura del proyecto

```bash
SistemaFacturacionElectronica/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── database/
├── config/
├── utils/
│
├── package.json
│
└── README.md
```

---

# ⚡ Instalación

## 📋 Requisitos

- Node.js
- MySQL
- NPM
- Git

---

# 🚀 Configuración del proyecto

## 1️⃣ Clonar repositorio

```bash
git clone https://github.com/isairey/SistemaFacturacionElectronica.git
```

---

## 2️⃣ Entrar al proyecto

```bash
cd SistemaFacturacionElectronica
```

---

## 3️⃣ Instalar dependencias

```bash
npm install
```

---

## 4️⃣ Configurar variables de entorno

```bash
cp .env.example .env
```

---

## 5️⃣ Configurar base de datos

```env
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=factucom_sat
DB_USERNAME=root
DB_PASSWORD=123456
```

---

## 6️⃣ Ejecutar servidor

```bash
npm run dev
```

---

# 🌐 API REST

# 📦 Productos

## 📥 GET

### Obtener todos los productos

```http
GET /products
```

---

### Obtener producto por ID

```http
GET /products/:id
```

---

## ➕ POST

### Crear producto

```http
POST /products/:id
```

### Parámetros

```json
{
  "name": "Laptop",
  "brand": "HP",
  "model": "EliteBook",
  "bought_price": 12000,
  "sell_price": 15000,
  "stock": 15
}
```

---

## 🔄 PATCH

### Actualizar producto

```http
PATCH /products/:id
```

---

## ❌ DELETE

### Eliminar producto

```http
DELETE /products/:id
```

---

# 🧾 Ventas

## 📥 GET

### Obtener ventas

```http
GET /sales
```

---

### Obtener venta por ID

```http
GET /sales/:id
```

---

## ➕ POST

### Crear venta

```http
POST /sales/:id
```

### Ejemplo JSON

```json
{
  "client": "XAXX010101000",
  "date": "2026-05-13",
  "cashier": "Administrador",
  "products": {
    "1": {
      "amount": 2,
      "unit_price": 1500,
      "discount": 100
    }
  },
  "note": "Venta mostrador"
}
```

---

## 🔄 PATCH

### Actualizar venta

```http
PATCH /sales/:id
```

---

## ❌ DELETE

### Eliminar venta

```http
DELETE /sales/:id
```

---

# 👥 Usuarios

## 📥 GET

### Obtener usuarios

```http
GET /users
```

---

### Obtener usuario por ID

```http
GET /users/:id
```

---

## ➕ POST

### Crear usuario

```http
POST /users/:id
```

### Ejemplo JSON

```json
{
  "comp_name": "FactuCom SAT",
  "username": "admin",
  "email": "admin@factucom.mx",
  "password": "password_encriptado"
}
```

---

## 🔄 PATCH

### Actualizar usuario

```http
PATCH /users/:id
```

---

## ❌ DELETE

### Eliminar usuario

```http
DELETE /users/:id
```

---

# 🔒 Seguridad

## 🛡️ Funcionalidades

- 🔐 Contraseñas cifradas
- 👨‍💻 Gestión de usuarios
- 🚫 Protección de endpoints
- 📄 Validación de datos
- ⚡ Manejo seguro de peticiones

---

# 📸 Vista previa

<div align="center">

<img width="1000" src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop" />

</div>

---

# 🧠 Objetivos del proyecto

## 🎯 Aprender y practicar

- APIs REST
- Node.js
- Express
- MySQL
- Arquitectura MVC
- CRUDs empresariales
- Facturación electrónica SAT

---

# 🚧 Roadmap

## 🔮 Próximas mejoras

- 📧 Envío automático de facturas
- 📄 Generación PDF CFDI
- 🔐 JWT Authentication
- ☁️ Deploy cloud
- 📊 Dashboard administrativo
- 📱 Aplicación móvil
- 🤖 Automatización inteligente

---

# 🤝 Contribuciones

Las contribuciones son bienvenidas ❤️

## Cómo contribuir

1. Fork del proyecto

```bash
git checkout -b feature/nueva-funcionalidad
```

2. Commit

```bash
git commit -m "✨ Nueva funcionalidad"
```

3. Push

```bash
git push origin feature/nueva-funcionalidad
```

4. Pull Request 🚀

---

# 👨‍💻 Autor

<div align="center">

## Isai Rey -- API REST Empresarial

Sistema enfocado en facturación electrónica, administración comercial y automatización empresarial para México 🇲🇽

</div>

---

# 🌟 Apoya el proyecto

⭐ Dale una estrella  
🍴 Haz fork  
📢 Comparte el proyecto

---

# 📜 Licencia

Proyecto educativo y empresarial desarrollado para prácticas de APIs REST, administración comercial y facturación electrónica CFDI 4.0.

---

<div align="center">

### 🇲🇽 FactuCom SAT — administración comercial y facturación electrónica moderna 🚀

</div>
