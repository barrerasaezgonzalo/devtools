import Base64Tool from "../tools/base64-encoder-decoder/tool";
import ColorConverter from "../tools/color-converter/tool";
import CronEditor from "../tools/cron-expression-editor/tool";
import CssMinifier from "../tools/css-minifier/tool";
import CurlToFetch from "../tools/curl-to-fetch/tool";
import HashGenerator from "../tools/hash-generator/tool";
import HtmlBeautifier from "../tools/html-beautifier/tool";
import JsRunner from "../tools/js-console-mock/tool";
import JsonDiff from "../tools/json-diff/tool";
import JsonFormatter from "../tools/json-formatter/tool";
import JsonToYamlConverter from "../tools/json-to-yaml/tool";
import JwtDebugger from "../tools/jwt-debugger/tool";
import JwtGenerator from "../tools/jwt-generator/tool";
import LoremIpsumGenerator from "../tools/lorem-ipsum-generator/tool";
import MarkdownPreviewer from "../tools/markdown-previewer/tool";
import PasswordGenerator from "../tools/password-generator/tool";
import RegexTester from "../tools/regex-tester/tool";
import SqlFormatter from "../tools/sql-formatter/tool";
import TimestampConverter from "../tools/timestamp-converter/tool";
import UrlEncoderDecoder from "../tools/url-encoder-decoder/tool";
import UrlParser from "../tools/url-parser/tool";
import UuidGenerator from "../tools/uuid-generator/tool";
import { Tool } from "../types";

export const defaultFaqs = (toolName: string) => [
  {
    question: `¿Qué es ${toolName}?`,
    answer: `${toolName} es una herramienta online disponible en DevTools.cl que permite a los desarrolladores realizar tareas comunes de forma rápida directamente desde el navegador, sin necesidad de instalar software adicional.`,
  },
  {
    question: "¿Es segura esta herramienta?",
    answer:
      "Sí. Todo el procesamiento se realiza localmente en tu navegador. Ningún dato se envía a servidores externos, por lo que tu información permanece privada.",
  },
  {
    question: `¿Cómo se utiliza ${toolName}?`,
    answer: `Simplemente ingresa los datos en la interfaz de la herramienta y el resultado se generará de forma instantánea. La herramienta funciona completamente en el navegador para ofrecer rapidez y seguridad.`,
  },
];

export const tools: Tool[] = [
  {
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    description:
      "Limpia, formatea y valida estructuras JSON. Identifica errores de sintaxis al instante.",
    component: JsonFormatter,
    faqs: defaultFaqs("JSON Formatter"),
    category: "formatters",
  },
  {
    slug: "base64-encoder-decoder",
    name: "Base64 Encoder / Decoder",
    description:
      "Codifica y decodifica texto o archivos a formato Base64 de forma segura.",
    component: Base64Tool,
    faqs: defaultFaqs("Base64 Encoder / Decoder"),
    category: "encoders",
  },
  {
    slug: "jwt-debugger",
    name: "JWT Debugger",
    description:
      "Decodifica y analiza tus JSON Web Tokens (JWT) de forma segura y local.",
    component: JwtDebugger,
    faqs: defaultFaqs("JWT Debugger"),
    category: "security",
  },
  {
    slug: "password-generator",
    name: "Generador de Contraseñas",
    description:
      "Crea passwords seguras y aleatorias con opciones personalizables.",
    component: PasswordGenerator,
    faqs: defaultFaqs("Password Generator"),
    category: "generators",
  },
  {
    slug: "uuid-generator",
    name: "Generador UUID / GUID",
    description:
      "Genera identificadores únicos universales (v4) de forma masiva.",
    component: UuidGenerator,
    faqs: defaultFaqs("UUID Generator"),
    category: "generators",
  },
  {
    slug: "sql-formatter",
    name: "SQL Formatter",
    description: "Embellece tus consultas SQL para una lectura más clara.",
    component: SqlFormatter,
    faqs: defaultFaqs("SQL Formatter"),
    category: "formatters",
  },
  {
    slug: "url-encoder-decoder",
    name: "URL Encoder / Decoder",
    description: "Codifica o decodifica parámetros de URL de forma segura.",
    component: UrlEncoderDecoder,
    faqs: defaultFaqs("URL Encoder / Decoder"),
    category: "encoders",
  },
  {
    slug: "html-beautifier",
    name: "HTML Beautifier",
    description: "Limpia y organiza código HTML desordenado.",
    component: HtmlBeautifier,
    faqs: defaultFaqs("HTML Beautifier"),
    category: "formatters",
  },
  {
    slug: "css-minifier",
    name: "CSS Minifier",
    description: "Reduce el tamaño de tus archivos CSS eliminando espacios.",
    component: CssMinifier,
    faqs: defaultFaqs("CSS Minifier"),
    category: "web",
  },
  {
    slug: "js-console-mock",
    name: "JavaScript Runner",
    description: "Entorno ligero para probar fragmentos de código JS.",
    component: JsRunner,
    faqs: defaultFaqs("JavaScript Runner"),
    category: "dev-tools",
  },
  {
    slug: "markdown-previewer",
    name: "Markdown Preview",
    description: "Escribe en Markdown y visualiza el resultado en tiempo real.",
    component: MarkdownPreviewer,
    faqs: defaultFaqs("Markdown Preview"),
    category: "web",
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description: "Genera texto de relleno para tus diseños.",
    component: LoremIpsumGenerator,
    faqs: defaultFaqs("Lorem Ipsum Generator"),
    category: "generators",
  },
  {
    slug: "color-converter",
    name: "Convertidor de Colores",
    description: "Transforma formatos entre HEX, RGB, HSL y CMYK.",
    component: ColorConverter,
    faqs: defaultFaqs("Color Converter"),
    category: "converters",
  },
  {
    slug: "cron-expression-editor",
    name: "Cron Job Editor",
    description: "Crea y traduce expresiones cron a lenguaje humano.",
    component: CronEditor,
    faqs: defaultFaqs("Cron Job Editor"),
    category: "dev-tools",
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    description:
      "Genera hashes MD5, SHA-1, SHA-256 y SHA-512 a partir de texto en tiempo real.",
    component: HashGenerator,
    faqs: defaultFaqs("Hash Generator"),
    category: "security",
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description:
      "Prueba expresiones regulares en tiempo real y visualiza coincidencias.",
    component: RegexTester,
    faqs: defaultFaqs("Regex Tester"),
    category: "dev-tools",
  },
  {
    slug: "json-to-yaml",
    name: "JSON → YAML Converter",
    description:
      "Convierte estructuras JSON a formato YAML de forma rápida y segura.",
    component: JsonToYamlConverter,
    faqs: defaultFaqs("JSON to YAML Converter"),
    category: "converters",
  },
  {
    slug: "timestamp-converter",
    name: "Unix Timestamp Converter",
    description:
      "Convierte timestamps Unix (Epoch) a fecha legible y viceversa.",
    component: TimestampConverter,
    faqs: defaultFaqs("Unix Timestamp Converter"),
    category: "converters",
  },
  {
    slug: "json-diff",
    name: "JSON Diff",
    description: "Compara dos objetos JSON y detecta diferencias entre ellos.",
    component: JsonDiff,
    faqs: defaultFaqs("JSON Diff"),
    category: "dev-tools",
  },
  {
    slug: "curl-to-fetch",
    name: "Curl → Fetch Converter",
    description: "Convierte comandos curl en código fetch() para JavaScript.",
    component: CurlToFetch,
    faqs: defaultFaqs("Curl to Fetch Converter"),
    category: "converters",
  },
  {
    slug: "url-parser",
    name: "URL Parser",
    description:
      "Analiza una URL y muestra sus componentes como protocolo, host, path y parámetros.",
    component: UrlParser,
    faqs: defaultFaqs("URL Parser"),
    category: "web",
  },
  {
    slug: "jwt-generator",
    name: "JWT Generator",
    description:
      "Genera JSON Web Tokens (JWT) a partir de un header, payload y secret.",
    component: JwtGenerator,
    faqs: defaultFaqs("JWT Generator"),
    category: "security",
  },
];
