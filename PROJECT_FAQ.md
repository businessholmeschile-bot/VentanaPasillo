# 📌 PROJECT_FAQ.md: Las Leyes de Hierro

Bienvenido a la Torre de Control de **Ventanapasillo.com**. Estas son las reglas inquebrantables que definen nuestra ingeniería y modelo de negocio.

### ⚖️ Ley 1: Monetización o Muerte

- **Si no hay link, la feature no existe.**
- Cada recomendación (hotel, tour, vuelo) es un vehículo para una transacción. La UX debe guiar al usuario inevitablemente hacia el clic de afiliado.

### 🔌 Estrategia de Integración de Afiliados (Fase 2)

Para escalar manualmente a programáticamente:

- **Vuelos**: Integración con **Travelpayouts API** para generar deep links dinámicos basados en IATA codes (SCL -> DPS).
- **Hoteles**: Uso de **Booking.com Affiliate Partner API**. El sistema buscará disponibilidad real y retornará el link con nuestro `affiliate_id` inyectado.
- **Experiencias**: **Viator/GetYourGuide API** para tours. Priorizamos tours con "Free Cancellation" para aumentar la conversión por reducción de riesgo.

### ⚖️ Ley 2: Cero Alucinaciones (Verdad > Ficción)

- **Logística Real**: Si Andy no conoce el precio exacto en tiempo real, debe proveer una estimación basada en datos históricos o rangos lógicos.
- Jamás inventar horarios de vuelo o rutas de transporte imposibles. La confianza es nuestra moneda.

### ⚖️ Ley 3: Estética del Futuro (Dark Mode Only)

- **Identidad Visual Innegociable**: El diseño debe verse como una herramienta del año 2030.
- **Paleta**: Fondo Profundo (`#0B1116`), Acción Cyan (`#00C2FF`), Insights Naranja (`#FF9F66`).
- Prohibido el "Look & Feel" de blog de viajes genérico.

---

_Andy v2.0 - Dominando la logística de viajes._
