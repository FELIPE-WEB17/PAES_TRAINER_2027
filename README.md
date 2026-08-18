# PAES Trainer 2027 - Comercial + Rachas

Versión comercial final orientada a adolescentes, con acceso anual individual, demo pública y gamificación.

## Incluye

- Demo gratuita de 9 preguntas sin registro.
- Compra por WhatsApp al +56 9 9513 2714.
- Un único acceso completo por 365 días.
- Login con usuario y contraseña creados por el administrador.
- Una licencia vinculada al primer dispositivo usado.
- Panel administrador: crear, renovar, bloquear, liberar dispositivo y cambiar contraseña.
- Todas las pruebas PAES incluidas en el banco de la app.
- Ensayos base y generador híbrido de ensayos nuevos.
- Práctica focalizada, errores, diagnóstico, historial y plan de mejora.
- Gamificación: racha diaria, XP, niveles, medallas, misión diaria, desafío semanal y protectores de racha.
- Panel administrador con última actividad, XP y racha sincronizados desde Supabase.

## Reglas de gamificación

La racha NO aumenta por abrir la app. Cuenta como actividad válida:

- ensayo completo;
- práctica de 10 o más preguntas;
- sesión de errores de 5 o más preguntas.

Premios base:

- Ensayo completo: +250 XP.
- Práctica de 10+ preguntas: +80 XP.
- Sesión de errores: +75 XP.
- 80% o más: +100 XP extra.
- Misión diaria: +100 XP.
- Desafío semanal: +500 XP.
- Cada 7 días de racha se obtiene un Protector de Racha, hasta 2 guardados.

La misión diaria usa el eje/habilidad de menor rendimiento acumulado del alumno. El desafío semanal requiere 3 prácticas, 1 ensayo, 1 sesión de errores y actividad en 4 días distintos.

## Seguridad

`config.js` solo lleva la URL de Supabase y la Publishable Key. Nunca pongas una Secret Key o `service_role` dentro de los archivos públicos.

Las operaciones administrativas se realizan mediante la Edge Function `admin-users` incluida en `supabase/functions/admin-users/index.ts`.

## Instalación

Lee `GUIA_INSTALACION.md` y sigue los pasos en orden.
