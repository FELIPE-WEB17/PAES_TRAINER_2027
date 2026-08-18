# Guía de instalación - PAES Trainer 2027

## 1. Subir o actualizar GitHub

1. Descomprime el ZIP.
2. Entra al repositorio de PAES Trainer en GitHub.
3. Usa **Add file > Upload files**.
4. Sube todos los archivos y la carpeta `supabase`.
5. Confirma que `index.html` quede en la raíz del repositorio.
6. Haz commit con el mensaje: `PAES Trainer - Comercial con Rachas`.

## 2. Crear Supabase

1. Crea un proyecto en Supabase.
2. En **SQL Editor > New query**, abre `supabase_setup.sql`, copia todo y pulsa **Run**.
3. Ve a **Authentication > Users** y crea el administrador con:
   - email: `admin@paestrainer.app`
   - una contraseña fuerte que solo tú conozcas.
   - usuario confirmado.
4. Copia el UUID del usuario administrador.
5. En SQL Editor ejecuta, reemplazando `UUID_DEL_ADMIN`:

```sql
insert into public.user_access(user_id,username,display_name,role,active,access_until)
values ('UUID_DEL_ADMIN','admin','Administrador','admin',true,now()+interval '10 years');
```

## 3. Crear la Edge Function de administración

1. En Supabase abre **Edge Functions**.
2. Selecciona **Deploy a new function > Via Editor**.
3. Nombre exacto: `admin-users`.
4. Abre `supabase/functions/admin-users/index.ts` del ZIP.
5. Copia su contenido completo sobre el editor de Supabase.
6. Pulsa **Deploy function**.

## 4. Conectar la app a Supabase

1. En Supabase ve a **Settings > API Keys**.
2. Copia la URL del proyecto y la **Publishable key**.
3. Abre `config.js` y reemplaza:

```js
SUPABASE_URL: "PEGA_AQUI_TU_SUPABASE_URL",
SUPABASE_PUBLISHABLE_KEY: "PEGA_AQUI_TU_PUBLISHABLE_KEY",
```

4. No cambies `WHATSAPP_NUMBER: "56995132714"` salvo que quieras cambiar el número de ventas.
5. Vuelve a subir `config.js` a GitHub y haz commit.

## 5. Publicar para producción sin costo fijo inicial: Cloudflare Pages

1. Crea/inicia sesión en Cloudflare.
2. Ve a **Workers & Pages > Create application > Pages**.
3. Selecciona **Import an existing Git repository**.
4. Conecta tu cuenta de GitHub y elige el repositorio PAES Trainer.
5. Configura:
   - Production branch: `main`
   - Build command: `exit 0`
   - Build output directory: `.`
6. Despliega.
7. Cloudflare entregará una URL terminada en `.pages.dev`.
8. Cada nuevo commit en `main` volverá a desplegar la app automáticamente.

## 6. Primera prueba

1. Abre la URL de Cloudflare en una ventana incógnita.
2. Prueba **Probar gratis**.
3. Comprueba el botón **Comprar por WhatsApp**.
4. Selecciona **Ya tengo acceso** e inicia sesión como `admin`.
5. Abre **Mi cuenta > Panel administrador**.
6. Crea un usuario de prueba, por ejemplo:
   - Nombre: `Alumno Prueba`
   - Usuario: `alumno1`
   - Contraseña: una clave de 8+ caracteres.
7. Cierra sesión e inicia con `alumno1`.
8. Completa una práctica de 10 preguntas.
9. Verifica que aparezcan XP y racha en el resultado y en **🔥 Racha**.
10. Vuelve al administrador y revisa que el alumno muestre XP, racha y última actividad.

## 7. Probar el bloqueo por dispositivo

1. Con `alumno1`, entra desde el primer dispositivo.
2. Intenta iniciar con el mismo usuario desde otro navegador/dispositivo.
3. Debe indicar que la cuenta está vinculada a otro dispositivo.
4. Si el cambio de equipo es legítimo, entra como administrador y pulsa **Liberar equipo**.

## 8. Venta real

1. El cliente abre la demo.
2. Pulsa **Comprar por WhatsApp**.
3. Tú le das los datos de transferencia por WhatsApp.
4. Confirmas el pago.
5. Creas su usuario desde el panel administrador.
6. Le entregas URL, usuario y contraseña.
7. La licencia dura 365 días.
8. Al renovar, usa **+1 año** y conserva la misma cuenta.

## 9. Importante sobre Vercel

Puedes usar tu despliegue actual de Vercel para pruebas mientras terminas la configuración. Para vender el producto, usa Cloudflare Pages o un plan comercial compatible: no dependas del plan Hobby gratuito de Vercel para un servicio con fines comerciales.

## 10. Qué se guarda dónde

- Supabase: licencia, usuario, vencimiento, dispositivo, XP, racha, medallas y última actividad.
- Navegador del alumno: historial detallado de respuestas, diagnóstico y progreso de estudio.
- GitHub/Cloudflare: código y banco de preguntas de la aplicación.

Nunca guardes contraseñas bancarias, claves privadas de Supabase ni datos de transferencia dentro de `config.js`.
