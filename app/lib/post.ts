import { Post } from "../types";

export const posts: Post[] = [
  {
    slug: "que-es-json-y-como-formatearlo",
    title: "¿Qué es JSON y cómo formatearlo correctamente?",
    description:
      "Aprende qué es JSON, para qué sirve y cómo formatearlo correctamente para evitar errores comunes al trabajar con APIs.",
    keywords: ["json", "que es json", "formatear json", "json formatter"],
    relatedTools: ["json-formatter"],
    publishedAt: "2026-03-18",
    content: `
      JSON (JavaScript Object Notation) es un formato de intercambio de datos ligero, ampliamente utilizado en desarrollo web para comunicar información entre sistemas.

      Hoy en día, prácticamente todas las APIs modernas utilizan JSON para enviar y recibir datos, lo que lo convierte en un estándar fundamental para cualquier desarrollador.

      Su estructura es simple: se basa en pares clave-valor y permite representar objetos, listas y datos complejos de forma clara y organizada.

      ## ¿Para qué sirve JSON?

      JSON se utiliza en múltiples escenarios dentro del desarrollo:

      - Comunicación entre frontend y backend (APIs REST)
      - Archivos de configuración (como package.json)
      - Almacenamiento de datos estructurados
      - Integración entre servicios

      Gracias a su formato legible, es fácil de entender y depurar, incluso sin herramientas avanzadas.

      ## Ejemplo de JSON

      Un JSON válido se ve así:

      {
        "nombre": "Juan",
        "edad": 30,
        "activo": true,
        "roles": ["admin", "editor"]
      }

      Cada clave está entre comillas y los valores pueden ser strings, números, booleanos, arrays u objetos.

      ## Errores comunes en JSON

      Al trabajar con JSON, es muy común encontrarse con errores de sintaxis que pueden romper completamente una aplicación o API.

      Los errores más frecuentes son:

      - Comas finales innecesarias
      - Uso de comillas simples en lugar de dobles
      - Claves sin comillas
      - Estructuras mal cerradas (faltan llaves o corchetes)
      - Valores inválidos

      Por ejemplo, este JSON es inválido:

      {
        nombre: "Juan",
      }

      Este tipo de errores genera mensajes como "JSON parse error" o "Unexpected token".

      ## Cómo formatear JSON correctamente

      Cuando trabajas con JSON minificado o mal estructurado, se vuelve muy difícil de leer y detectar errores.

      Formatear JSON (también conocido como "pretty print") permite:

      - Ver la estructura claramente
      - Identificar errores rápidamente
      - Depurar respuestas de APIs
      - Mejorar la legibilidad del código

      ## Ejemplo: JSON sin formatear

      {"nombre":"Juan","edad":30,"activo":true}

      ## JSON formateado

      {
        "nombre": "Juan",
        "edad": 30,
        "activo": true
      }

      Como puedes ver, la diferencia es significativa.

      ## Cuándo deberías usar un JSON Formatter

      Deberías usar un formateador cuando:

      - Recibes respuestas de APIs difíciles de leer
      - Estás depurando errores
      - Trabajas con archivos JSON grandes
      - Necesitas validar estructura

      Una herramienta de formateo te permite validar y corregir errores en segundos.

      Puedes usar nuestro JSON Formatter para limpiar, validar y visualizar tus datos directamente en el navegador, sin enviar información a ningún servidor.
      `,
  },
  {
    slug: "que-es-base64-y-cuando-usarlo",
    title: "¿Qué es Base64 y cuándo deberías usarlo?",
    description:
      "Descubre qué es Base64, cómo funciona y en qué casos se utiliza en desarrollo web y APIs.",
    keywords: ["base64", "encode base64", "decode base64"],
    relatedTools: ["base64-encoder-decoder"],
    publishedAt: "2026-03-18",
    content: `
      Base64 es un método de codificación que permite convertir datos binarios en texto ASCII, lo que facilita su transmisión a través de sistemas que solo soportan texto.

      Es muy común en desarrollo web, especialmente cuando se trabaja con APIs, imágenes embebidas o tokens.

      ## ¿Para qué sirve Base64?

      Base64 se utiliza principalmente en:

      - Envío de archivos a través de APIs
      - Codificación de imágenes en HTML o CSS (data URLs)
      - Transmisión de datos binarios en formatos JSON o XML
      - Manejo de tokens o credenciales

      ## Ejemplo de Base64

      Texto original:

      Hola

      Codificado en Base64:

      SG9sYQ==

      ## ¿Base64 es seguro?

      Es importante entender que Base64 NO es un método de encriptación.

      Cualquiera puede decodificarlo fácilmente, por lo que no debe usarse para proteger información sensible.

      ## Errores comunes al usar Base64

      - Pensar que es un sistema de seguridad
      - Codificar datos sin validar el formato
      - Problemas de padding (= al final del string)
      - Mezclar Base64 con encoding de URLs

      ## Cuándo deberías usar Base64

      Base64 es útil cuando necesitas:

      - Enviar datos binarios en texto
      - Incluir imágenes directamente en HTML o CSS
      - Transportar información en APIs sin romper el formato

      Puedes usar nuestra herramienta Base64 Encoder / Decoder para codificar y decodificar datos de forma rápida y segura.
      `,
  },
  {
    slug: "que-es-un-jwt-y-como-funciona",
    title: "¿Qué es un JWT y cómo funciona?",
    description:
      "Aprende cómo funcionan los JSON Web Tokens (JWT), su estructura y cómo se utilizan en autenticación.",
    keywords: ["jwt", "json web token", "jwt debugger"],
    relatedTools: ["jwt-debugger"],
    publishedAt: "2026-03-18",
    content: `
      Un JWT (JSON Web Token) es un estándar utilizado para transmitir información de forma segura entre dos partes, generalmente en procesos de autenticación.

      Es ampliamente usado en APIs modernas para manejar sesiones sin necesidad de almacenar datos en el servidor.

      ## Estructura de un JWT

      Un JWT está compuesto por tres partes:

      - Header: contiene el algoritmo de firma
      - Payload: contiene los datos (claims)
      - Signature: verifica que el token no ha sido alterado

      Ejemplo:

      xxxxx.yyyyy.zzzzz

      ## ¿Para qué sirve un JWT?

      - Autenticación en APIs
      - Manejo de sesiones sin estado (stateless)
      - Intercambio seguro de información entre servicios

      ## Ejemplo real

      Cuando un usuario inicia sesión, el servidor genera un JWT que luego se envía en cada request:

      Authorization: Bearer <token>

      ## Errores comunes con JWT

      - Tokens expirados (exp)
      - Firmas inválidas
      - Uso de claves incorrectas
      - Almacenar información sensible en el payload

      ## Consideraciones de seguridad

      El payload de un JWT puede ser leído fácilmente, por lo que no debes guardar información sensible sin cifrado adicional.

      ## Cuándo usar JWT

      JWT es ideal cuando necesitas:

      - APIs escalables
      - Autenticación sin sesiones en servidor
      - Integración entre múltiples servicios

      Puedes usar nuestro JWT Debugger para analizar tokens, ver su contenido y detectar problemas fácilmente.
      `,
  },
  {
    slug: "como-generar-contrasenas-seguras",
    title: "Cómo generar contraseñas seguras (guía práctica)",
    description:
      "Aprende a crear contraseñas seguras, evitar errores comunes y proteger tus cuentas.",
    keywords: ["password generator", "contraseñas seguras"],
    relatedTools: ["password-generator"],
    publishedAt: "2026-03-18",
    content: `
      Las contraseñas seguras son una de las principales barreras de protección para tus cuentas y datos personales.

      Una mala contraseña puede ser vulnerada en segundos, mientras que una buena puede resistir ataques automatizados durante años.

      ## Características de una contraseña segura

      Una contraseña fuerte debe tener:

      - Al menos 12 caracteres
      - Combinación de mayúsculas y minúsculas
      - Números
      - Símbolos
      - No contener información personal

      ## Ejemplo de contraseña segura

      Ejemplo:

      fT9!kP2#xL8@qZ

      ## Errores comunes

      - Usar la misma contraseña en múltiples sitios
      - Contraseñas cortas o simples (123456, password)
      - Usar datos personales (nombre, fecha de nacimiento)
      - No actualizar contraseñas

      ## Cómo crear contraseñas seguras fácilmente

      La mejor forma es usar un generador automático que cree combinaciones aleatorias.

      Esto evita patrones predecibles y mejora significativamente la seguridad.

      ## Cuándo deberías usar un generador

      - Crear nuevas cuentas
      - Cambiar contraseñas antiguas
      - Proteger accesos críticos

      Puedes usar nuestra herramienta Generador de Contraseñas para crear claves seguras en segundos.
      `,
  },
  {
    slug: "que-es-un-uuid-y-para-que-sirve",
    title: "¿Qué es un UUID y para qué sirve?",
    description:
      "Descubre qué es un UUID, cómo funciona y por qué es clave en sistemas distribuidos.",
    keywords: ["uuid", "guid", "uuid generator"],
    relatedTools: ["uuid-generator"],
    publishedAt: "2026-03-18",
    content: `
      Un UUID (Universally Unique Identifier) es un identificador único diseñado para ser generado sin necesidad de un sistema centralizado.

      Se utiliza ampliamente en sistemas distribuidos donde múltiples servicios generan datos al mismo tiempo.

      ## ¿Para qué sirve un UUID?

      - Identificar registros en bases de datos
      - Generar IDs únicos en APIs
      - Sistemas distribuidos
      - Evitar colisiones entre datos

      ## Ejemplo de UUID

      550e8400-e29b-41d4-a716-446655440000

      ## Características principales

      - Alta probabilidad de unicidad
      - No depende de un servidor central
      - Se puede generar localmente

      ## UUID vs ID autoincremental

      A diferencia de los IDs tradicionales:

      - UUID no sigue secuencia
      - Es más seguro para exposición pública
      - Evita conflictos en sistemas distribuidos

      ## Cuándo usar UUID

      - Sistemas distribuidos
      - APIs públicas
      - Bases de datos con múltiples fuentes

      Puedes generar UUIDs fácilmente con nuestra herramienta de forma instantánea.
      `,
  },
  {
    slug: "como-formatear-sql-correctamente",
    title: "Cómo formatear SQL para mejorar la legibilidad",
    description:
      "Aprende a formatear consultas SQL para mejorar la legibilidad y mantenimiento del código.",
    keywords: ["sql formatter", "formatear sql"],
    relatedTools: ["sql-formatter"],
    publishedAt: "2026-03-18",
    content: `
      Formatear SQL correctamente es clave para mejorar la legibilidad, mantenimiento y debugging de consultas complejas.

      Un SQL desordenado puede ser difícil de entender y propenso a errores.

      ## ¿Por qué formatear SQL?

      - Mejora la lectura del código
      - Facilita el mantenimiento
      - Reduce errores
      - Permite detectar problemas más rápido

      ## Ejemplo sin formatear

      SELECT * FROM users WHERE active=1 AND role='admin'

      ## SQL formateado

      SELECT *
      FROM users
      WHERE active = 1
        AND role = 'admin'

      ## Buenas prácticas

      - Usar saltos de línea por cláusula
      - Indentar condiciones
      - Separar SELECT, FROM, WHERE
      - Evitar líneas largas

      ## Errores comunes

      - Consultas en una sola línea
      - Falta de indentación
      - Uso inconsistente de mayúsculas

      ## Cuándo usar un SQL Formatter

      - Consultas largas
      - Debugging
      - Trabajo en equipo

      Puedes usar nuestro SQL Formatter para mejorar la legibilidad de tus consultas automáticamente.
      `,
  },
  {
    slug: "que-es-url-encoding",
    title: "¿Qué es URL Encoding y por qué es importante?",
    description:
      "Aprende cómo funciona el URL encoding y por qué es esencial para enviar datos en URLs.",
    keywords: ["url encode", "url decode"],
    relatedTools: ["url-encoder-decoder"],
    publishedAt: "2026-03-18",
    content: `
      El URL Encoding es un proceso que permite convertir caracteres especiales en un formato seguro para ser utilizado dentro de una URL.

      Esto es fundamental cuando se envían datos a través de parámetros en aplicaciones web o APIs.

      ## ¿Por qué es importante?

      Las URLs solo pueden contener ciertos caracteres. Cuando se usan espacios o símbolos, deben ser codificados.

      ## Ejemplo de URL Encoding

      Espacio: %20
      Texto: hola mundo

      Resultado: hola%20mundo

      ## ¿Para qué sirve?

      - Enviar parámetros en URLs
      - Evitar errores en APIs
      - Manejar caracteres especiales
      - Formularios web

      ## Errores comunes

      - No codificar espacios
      - Doble encoding
      - Confundir encode con decode
      - Problemas con caracteres especiales

      ## Cuándo usar URL Encoding

      - Al enviar datos por query params
      - Integraciones con APIs
      - Formularios web

      Puedes usar nuestra herramienta para codificar y decodificar URLs fácilmente y evitar errores.
      `,
  },
];
