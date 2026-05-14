# Factucom Peru

## Server documentation

### Productos

#### GET
/products
```
Retorna todos los productos
```
/products/$id
```
Retorna el producto con aquel ID
```
#
#### POST
/products/$id
```
Crea un nuevo producto con un ID con los siguentes parametros en el query:

name: Nombre del producto
brand: Marca del producto
model: Modelo del producto
bought_price: Precio de compra del producto
sell_price: Precio de venta del producto
stock: Cantidad de stock del producto
```
#
#### PATCH
/products/$id
```
Actualiza un producto con el ID proveido y con los siguentes parametros en el query:

name: Nombre del producto
brand: Marca del producto
model: Modelo del producto
bought_price: Precio de compra del producto
sell_price: Precio de venta del producto
stock: Cantidad de stock del producto
```
#
#### DELETE
/products/$id
```
Elimina un producto con el ID proveido
```

### Ventas

#### GET
/sales
```
Retorna todas las ventas
```
/sales/$id
```
Retorna la venta con aquel ID
```
#
#### POST
/sales/$id
```
Crea una nueva venta con un ID con los siguentes parametros en el query:

client: (string) RUC del cliente (00000000 por defecto)
date: (SQLdate) Fecha en formato SQL de la venta
cashier: (string) Nombre del cajero autor de la venta
products: (JSONstring) JSON stringificado de cada producto en el siguente formato:

products: {
    "product_id": {
        "amount": (number) Cantidad del producto vendido,
        "unit_price": (number) Precio de venta del producto,
        "discount" (number) Cantidad de descuento en soles
    }
}

note: (string) Detalle adicional o extra del producto

```
#
#### PATCH
/sales/$id
```
Actualiza una venta con el ID proveido y con los siguentes parametros en el query:

client: (string) RUC del cliente (00000000 por defecto)
date: (SQLdate) Fecha en formato SQL de la venta
cashier: (string) Nombre del cajero autor de la venta
products: (JSONstring) JSON stringificado de cada producto en el siguente formato:

products: {
    "product_id": {
        "amount": (number) Cantidad del producto vendido,
        "unit_price": (number) Precio de venta del producto,
        "discount" (number) Cantidad de descuento en soles
    }
}

note: (string) Detalle adicional o extra del producto
```
#
#### DELETE
/sales/$id
```
Elimina una venta con el ID proveido
```

### Usuarios

#### GET
/users
```
Retorna todos los usuarios
```
/users/$id
```
Retorna el usuario con aquel ID
```
#
#### POST
/users/$id
```
Crea un nuevo usuario con un ID con los siguentes parametros en el query:

comp_name: (string) Nombre de la empresa del usuario
username: (string) Nombre de usuario
email: (string) Correo del usuario
password: (string) Contraseña encriptada del usuario
```
#
#### PATCH
/users/$id
```
Actualiza un usuario con el ID proveido y con los siguentes parametros en el query:

comp_name: (string) Nombre de la empresa del usuario
username: (string) Nombre de usuario
email: (string) Correo del usuario
password: (string) Contraseña encriptada del usuario
```
#
#### DELETE
/users/$id
```
Elimina un usuario con el ID proveido
```