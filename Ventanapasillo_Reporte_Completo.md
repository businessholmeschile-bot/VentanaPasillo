# Ventanapasillo.com - Reporte de Estado y Arquitectura (Febrero 2026)

Este documento centraliza los objetivos, el progreso actual y la arquitectura técnica de Ventanapasillo.com, tu arquitecto de viajes personal potenciado por IA.

---

## 1. Visión y Objetivos

**Misión:** Transformar la planificación de viajes de un proceso tedioso de investigación de horas a una experiencia de "un solo clic". Ventanapasillo.com actúa como un "Copiloto" (llamado Andy) que no solo genera itinerarios, sino que optimiza presupuestos, revela "Hidden Gems" (secretos locales) y facilita la reserva con integraciones reales y directas.

**Objetivos de Negocio / Monetización:**

- Ofrecer itinerarios hiper-personalizados y de alta calidad estética de forma gratuita (inicialmente).
- Monetizar a través de enlaces de afiliados inteligentes y contextuales (Vuelos, Hoteles, Actividades).
- Crear una herramienta de alto valor percibido ("Premium Feel") que fomente la retención y la acción transaccional.
- Preparar el terreno para funciones "Premium" (exportación a PDF, compartición de viajes, itinerarios colaborativos).

---

## 2. Lo que tenemos construido hasta hoy (Funcionalidades)

### El Motor "Andy" (Inteligencia Artificial)

- **AndyBrain:** Un servicio conectado a la API de **Google Gemini 1.5 Flash** que actúa como el cerebro del planificador.
- **Generación Estructurada:** Andy devuelve los itinerarios en un formato JSON estricto, lo que permite renderizar la UI de forma predecible sin parseos complicados ni errores de markdown.
- **Personalidad y Tono:** Andy está configurado (vía system prompt) para hablar como un experto sofisticado, con "calle", que recomienda experiencias auténticas (evitando trampas turísticas) y genera estimaciones de costos reales en USD.
- **Modo Fallback Procedural:** Si la API de Gemini falla, no hay internet o no hay API key, el sistema cuenta con un generador procedural de respaldo y rutas hardcodeadas (ej. Bali, Tokio, Patagonia) para asegurar que el usuario nunca vea la pantalla en blanco.

### Arquitectura de Resultados (Trip View)

- **Vistas Duales de Vuelo (Fast vs Cheap):** Andy procesa y presenta dos opciones de vuelo iniciales de forma estratégica:
  1. _Velocidad Máxima_: Vuelo directo o de 1 escala corta, priorizando tiempo y aerolíneas premium.
  2. _Opción Ahorro_: Rutas con más escalas y aerolíneas de bajo costo para mochileros/viajeros con presupuesto ajustado.
- **Sidebar Interactivo (El Bolsillo):** Un panel lateral dinámico ("sticky") que permite al usuario manipular su presupuesto.
  - _Nivel de Confort_: Slider de 4 niveles (Mochilero, Standard, Comfort, Ultra Lujo) que recalcula instantáneamente los costos de Alojamiento, Comida y Actividades aplicando multiplicadores matemáticos.
  - _Toggle Por Persona / Total_: Permite visualizar la división del gasto.
  - _Toggle Moneda (USD/CLP)_: Conversión simulada.
  - _El "Colchón de Andy"_: Un 10% calculado como fondo de emergencia (muy útil para confianza del usuario).
  - _Tendencias e Índice de Vida_: Muestra precios locales de café/uber/cena para contexto.
- **Itinerario (Día a Día):** Layout premium con estética editorial. Títulos grandes, tarjetas de actividades con foto principal y miniaturas (thumbnails), insignias dinámicas de costo y hora, y "Tips" o consejos clave de Andy por actividad.
- **Hoteles y Secretos Locales:** Secciones dedicadas a recomendar alojamientos estratégicos con badges ("Mochilero Premium", "Onsen Gratis") y curiosidades/hacks del destino.
- **Fechas Tentativas (Draft):** Input superior en el sidebar para capturar la intención temporal del usuario, preparando el sistema para cálculos de vuelos precisos.

### Módulo de Afiliafos DInámicos (Affiliate Engine)

- **AffiliateService.ts:** Un servicio dedicado que intercepta el plan de viaje generado por la IA y le inyecta (enriquece) Deep Links dinámicos antes de enviarlo a la UI.
- Genera URLs de **Skyscanner** en base al origen (por defecto manejado como SCL) y el destino.
- Genera URLs de **Booking.com** buscando directamente el nombre de la ciudad/destino.
- Genera URLs de **Viator / GetYourGuide** para actividades pagas en la ruta.

### El Landing y Herramientas Dev

- **Bento Grid:** Landing page con presentación en grid moderna (El Cerebro, El Bolsillo, El Secreto).
- **Modo Developer (Menú de Prueba):** Se integró un dropdown de pruebas de estrés (ej. "Antártica extrema", "Chernobyl") para auditar rápidamente la capacidad de Andy y Unsplash.

### El Portal de Entrada: El Mapa Interactivo (Global Domination)

- **Mapa Protagonista:** La vista principal (Home) consiste en un globo terráqueo o mapa masivo que sirve como la capa primaria de exploración.
- **Puntos Interesantes:** Existen puntos estáticos en el mapa (ej. azules) en los países con rutas validadas/visitadas.
- **Filtros Dinámicos (Barra Superior):** El usuario no usa una simple caja de texto, usa un selector de Presupuesto (ej. $1000 USD), Días (ej. 3 días) y Clima (Frío/Calor).
- **Feedback Visual (Validación):** A medida que se ajustan los filtros, los puntos azules que cumplen con el presupuesto/tiempo cambian de estado (se vuelven verdes o parpadean).
- **Despliegue de Información:** Al pinchar en un país validado (ej. Brasil iluminado en verde para $1000 y Calor), el mapa de desplaza y/o despliega en la parte inferior toda la planificación sugerida para ese país, la justificación de costos (por qué 1000 dólares bastan), la distribución de los días, etc.

---

## 3. Arquitectura Técnica y Stack

**Frontend:**

- **React.js con TypeScript:** Para tipado estricto (Interfaces `TravelPlan`, `Activity`, `Day`) y robustez a gran escala.
- **Tailwind CSS:** Para estilos rápidos, diseño responsivo y la estética visual moderna.
- **Lucide React:** Biblioteca de iconos minimalista y de peso pluma.
- **Vite:** Empaquetador extremadamente rápido para el entorno de desarrollo.

**Diseño y UI/UX ("Premium Feel"):**

- **White Mode (Predeterminado):** Diseño completamente centrado en fondos claros y limpios como protagonista, proporcionando una interfaz brillante, moderna y confiable que no se asemeja a un blog tradicional.
- **Dark Mode Discreto:** Existe un botón sutil para activar el Modo Oscuro, donde el diseño cambia a negros profundos y grises sutiles, pero la experiencia inicial (por defecto) es White Mode.
- **Glassmorphism y Blur:** Elementos flotantes con `backdrop-blur` (ej. etiquetas de precio sobre las fotos) para dar un look moderno tipo "iOS/VisionOS".
- **Acentos de Color:** Paleta definida principalmente por Cian (`brand-cyan`), naranjas para alertas de ahorro y fondos blancos o grises perlados extremadamente sutiles.
- **Vocabulario Seguro:** Evitar estrictamente términos como "pico de ventas" (usar "alta demanda" o "peak").

**Integraciones, APIs y Servicios Externos:**

1. **Google Gemini (AI):** Vía `@google/generative-ai`. API Key gestionada en `.env.local`.
2. **Unsplash Source (Imágenes):** El sistema asigna "temas" (Themes: snow, beach, jungle, city, etc.) a cada actividad desde la IA y mapea esas palabras a imágenes seguras obtenidas de colecciones o URLs procedimentales de Unsplash.
3. **Supabase (Backend/DB):** (En integración / "Fire-and-forget"). Función `saveTripToDB` existente para registrar las búsquedas en la base de datos de manera asíncrona.

---

## 4. Estado Actual / Siguientes Pasos (Next Steps)

La base técnica está sumamente firme. La lógica "Cerebro -> Componente UI -> Enlace de Afiliado" está conectada y funcionando.

**En qué debemos concentrarnos pronto:**

1. **El Motor de Fechas:** Conectar el input de "Fechas Tentativas" a un DatePicker real (estilo Airbnb) y pasar dichas fechas al `AffiliateService` para generar URLs de Skyscanner/Booking exactas para los links de afiliados.
2. **Afiliamiento Real (Monetización):** Reemplazar las IDs de prueba en los links de afiliados de Skyscanner, Booking y Viator por tus Affiliate IDs formales.
3. **Refinamiento de Imágenes:** A veces Andy asigna temas genéricos o muy locos. Mejorar la integración usando la API oficial de Unsplash JSON (en lugar de simple source/URLs) o concatenando mejor las queries para mayor precisión.
4. **Exportar a PDF:** Dar vida al botón "Exportar PDF" que figura en el Header.
5. **Micro-Interacciones:** Mejorar animaciones en los Skeleton Loaders (mientras carga Gemini) y hacer que los números del presupuesto hagan un pequeño contador visual cuando el usuario mueve el slider.
