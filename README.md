# PAES Trainer 2027 - V2 Final

Aplicación web instalable (PWA) para M1, M2, Biología y Competencia Lectora.

## Incluye
- Ensayos base con temporizador, corrección automática y puntaje estimado.
- Generador híbrido de ensayos nuevos: combina variantes nuevas controladas con preguntas del banco validado.
- Selector de 35%, 50% o 65% de variantes nuevas.
- Evita repetir preguntas del banco mientras queden preguntas no utilizadas en el dispositivo.
- Las preguntas generadas incluyen respuesta correcta, dificultad, eje/habilidad y explicación.
- En Competencia Lectora, cada pregunta generada incorpora su texto asociado.
- Modo práctica filtrable por prueba, eje/habilidad y dificultad.
- Práctica de errores anteriores, incluyendo errores de preguntas generadas.
- Diagnóstico acumulado con semáforo de dominio.
- Fortalezas, prioridades y plan de mejora recomendado.
- Rendimiento por dificultad.
- Historial y evolución de puntajes.
- Revisión pregunta por pregunta con explicación.
- Datos guardados localmente en el navegador.

## Cómo funciona el generador
La versión incluida funciona sin una API externa. Las variantes nuevas se crean con plantillas académicas controladas y se mezclan con el banco existente para conservar la estructura de cada prueba.

Las claves de servicios de IA nunca deben ponerse en app.js o generator.js. Si más adelante se conecta un modelo externo, debe hacerse mediante un backend o una función serverless segura.

## Publicar en Vercel
1. Sube todos los archivos de esta carpeta a la raíz de un repositorio GitHub.
2. En Vercel, importa el repositorio.
3. Framework Preset: Other (o automático).
4. No necesitas Build Command.
5. Deploy.

## Probar localmente
Desde esta carpeta ejecuta:

    python3 -m http.server 8080

Luego abre http://localhost:8080

## Nota
Los puntajes y niveles son referenciales. El material no es oficial DEMRE. Las preguntas generadas son material de práctica y deben revisarse periódicamente antes de un uso masivo o comercial.
