# Ruben S.A. Banco — App móvil (Angular 18)

Pantallas (rutas):
- `/login` Inicio de sesión (DNI + clave)
- `/biometria` Ingreso con huella dactilar
- `/registro` Registro de usuario (Paso 1 de 2)
- `/otp` Confirmación OTP (Paso 2 de 2)
- `/contrasena` Creación de contraseña (Paso final)
- `/inicio` Inicio y movimientos
- `/tarjetas` Centro de tarjetas
- `/transferencias` Transferencias y bancos

## Ejecutar
```bash
npm install
npm start   # http://localhost:4200
```
Componentes standalone, sintaxis de control `@if/@for`, estilos globales en `src/styles.css`.
Los datos son de ejemplo; reemplázalos por llamadas a tu API.
Para empaquetar como app móvil puedes añadir Capacitor: `npm i @capacitor/core @capacitor/cli && npx cap init`.
