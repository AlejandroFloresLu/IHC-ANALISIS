# Documentación del Dashboard Analítico IHC

Este documento detalla exhaustivamente la arquitectura técnica y justifica cada decisión metodológica, cuantitativa y cualitativa implementada en el Dashboard de Analíticas. Se enfoca en explicar qué mide cada componente, por qué se eligió visualmente, y cómo interpretar los datos para mejorar la Interfaz de Usuario (UI) y la Experiencia de Usuario (UX).

---

## 1. Arquitectura Técnica y Datos Temporales (Mock)

El proyecto utiliza **React + Vite** para renderizado ultra-rápido del lado del cliente, y **TailwindCSS** para un diseño moderno (Glassmorphism). Los datos se consumen dinámicamente de URLs de Google Sheets y se parsean en memoria usando **Papaparse**. Todos los gráficos son impulsados por **Chart.js**.

**¿Cómo usar datos temporales (Mock Data) para probar la interfaz?**
Actualmente, el sistema lee los CSV en vivo. Para hacer pruebas sin internet o con datos manipulados, hemos dejado habilitada la estructura en el código. Simplemente puedes crear un archivo `public/mockData.json` con un objeto JSON válido y cambiar los endpoints en `src/services/dataService.js` para que apunten a `"/mockData.json"`.

---

## 2. Justificación Cuantitativa y Cualitativa Exhaustiva

En Interacción Humano-Computadora (IHC), los datos no sirven de nada si no se traducen en acciones de diseño. A continuación, se detalla **por qué** y **para qué** existe cada cuadro en este Dashboard.

### A. Escala Base de Medición (Likert del 1 al 5)
*   **Qué y cómo se calcula:** Las respuestas de texto ("Totalmente en desacuerdo" a "Totalmente de acuerdo") se convierten internamente mediante una fórmula aritmética a valores numéricos enteros del `1` (peor evaluación) al `5` (mejor evaluación). El cálculo final para los gráficos es la sumatoria de valores dividida entre la cantidad total de usuarios.
*   **Por qué se usa esta escala:** Se desechó usar escalas confusas (como -1 a 1) porque el modelo **1 al 5** es el estándar psicométrico mundial (utilizado en el test *SUS - System Usability Scale*). Provee un punto neutro perfecto (`3`) y los promedios resultantes son universales y fáciles de interpretar para cualquier Stakeholder.

---

### B. Radar de Atributos del Sistema (Gráfico de Diamante/Araña)
*   **Qué se está midiendo:** La percepción base del sistema en 4 pilares: Estética Visual, Rendimiento (Velocidad), Legibilidad del texto y Navegación. Se promedian las respuestas de la escala 1-5.
*   **Por qué se eligió este gráfico:** El gráfico de Radar es la herramienta perfecta para evaluar **equilibrio multivariado**. En IHC, el sistema debe ser simétrico. Las barras no permiten ver la "forma" de la experiencia global, el radar sí.
*   **En qué nos podemos fijar:** Debemos observar la forma del diamante. Si la figura está "hundida" en alguna esquina (ej. la esquina de Rendimiento no llega ni al nivel 3), indica un punto crítico de fallo en la percepción.
*   **Para qué sirve y qué se puede mejorar:** Nos indica en qué disciplina invertir recursos. Si el hundimiento es en "Legibilidad", debemos intervenir el CSS (aumentar el tamaño de fuente, subir el contraste). Si es en "Velocidad", se requiere intervención de programación (optimizar imágenes, minificar código).

---

### C. Evaluación de Heurísticas por Componente (Gráfico de Barras Horizontales)
*   **Qué se está midiendo:** La satisfacción puntual con elementos específicos e independientes de la UI (Control del carrito, Confianza en transferencia bancaria, Formulario, Visibilidad de WhatsApp).
*   **Por qué se eligió este gráfico:** Las categorías evaluadas tienen nombres largos y descriptivos. El gráfico de barras horizontales permite que el texto se lea de izquierda a derecha de forma natural sin recortarse, facilitando la comparación de magnitudes.
*   **En qué nos podemos fijar:** Buscamos la barra más corta de todas. Esa barra representa la heurística que se está rompiendo con mayor severidad.
*   **Para qué sirve y qué se puede mejorar:** Convierte principios abstractos (ej. Heurística de Control del Usuario) en arreglos tangibles. Si la barra de "Visibilidad de WhatsApp" es la más baja, nos sirve para justificar cambiar el icono a un color más contrastante, hacerlo flotante o aumentar su tamaño en el próximo ciclo de diseño.

---

### D. Embudo de Dificultad del Proceso (Gráfico de Barras Apiladas)
*   **Qué se está midiendo:** La frecuencia de niveles de dificultad ("Muy fácil", "Fácil", "Neutral", "Difícil", "Muy difícil") ordenados lógicamente por los pasos del *User Journey* (Buscar -> Carrito -> Datos -> Confirmar).
*   **Por qué se eligió este gráfico:** Las "Barras Apiladas" (Stacked Bars) son la única forma visual de representar "fricción acumulada". Permiten ver cómo se distribuye la dificultad dentro del 100% de la experiencia de un paso específico.
*   **En qué nos podemos fijar:** El foco debe estar en las franjas de color rojo oscuro (las respuestas de "Difícil" y "Muy difícil"). Se debe observar en qué paso exacto del proceso esa franja roja se hace más ancha o prominente.
*   **Para qué sirve y qué se puede mejorar:** Es un detector de **cuellos de botella** en la conversión de ventas. Si vemos que en "Llenar datos de entrega" el rojo se dispara, sabemos que el fallo de UI está en el formulario. Con esta medida se justificaría implementar autocompletado de Google Maps o dividir el formulario en varios pasos (Wizard) para bajar la carga cognitiva.

---

### E. Tasa de Frustración (Tarjeta KPI / Indicador Clave)
*   **Qué se está midiendo:** El porcentaje directo de usuarios que respondieron "Sí" a sentirse frustrados o con deseos de abandonar. Cálculo: `(Frustrados / Usuarios Totales) * 100`.
*   **Por qué se eligió este gráfico:** No se usó un gráfico complejo porque esta métrica es una **alarma de emergencia**. Al estar en una "KPI Card" gigante con un ícono claro, domina la jerarquía visual del Dashboard, evitando que un fallo grave se disfrace entre otros datos.
*   **En qué nos podemos fijar:** En el número puro. Cualquier porcentaje superior al 10-15% es un indicio de que la interfaz está expulsando clientes potenciales de forma activa.
*   **Para qué sirve y qué se puede mejorar:** Nos sirve para evaluar la salud general de tolerancia al error. Si este KPI es alto, justifica detener los esfuerzos de "agregar nuevas funciones" y concentrar al equipo exclusivamente en estabilizar y limpiar la interfaz existente.

---

### F. Índice de Usabilidad General (Gráfico de Barras Verticales)
*   **Qué se está midiendo:** Promedios de variables macro (Fácil navegación general, Consistencia de UI, Claridad general de la información).
*   **Por qué se eligió este gráfico:** A diferencia de las heurísticas de componentes aislados, estos son los tres pilares de construcción de la página. Las barras verticales simulan el rendimiento de estas columnas estructurales.
*   **En qué nos podemos fijar:** Que todas las columnas mantengan una altura similar y superen la media aceptable (por encima del 4.0).
*   **Para qué sirve y qué se puede mejorar:** Si la "Consistencia de UI" decae fuertemente respecto a la "Fácil navegación", nos sirve para dictaminar que, aunque el usuario sabe dónde ir, siente que las páginas no combinan entre sí. La mejora directa sería implementar y forzar un Sistema de Diseño Unificado (Design System) para todos los botones y tipografías.

---

### G. Contexto Demográfico (Gráficos de Pastel)
*   **Qué se está midiendo:** Frecuencias relativas de variables previas al test (Rango de edad, Dispositivo principal de acceso, Motivos históricos de abandono).
*   **Por qué se eligió este gráfico:** Los gráficos de pastel (*Pie Charts*) son óptimos para mostrar las partes de un "todo" en un solo vistazo, perfectos para variables categóricas cerradas.
*   **En qué nos podemos fijar:** En la porción dominante ("la moda"). Por ejemplo, el trozo del pastel que indique el dispositivo más usado.
*   **Para qué sirve y qué se puede mejorar:** En IHC no se diseña para "todos", se diseña para el **Usuario Promedio (Persona)**. Si el 85% de los usuarios accede vía Móvil, esta métrica nos dicta que el proceso de rediseño debe enfocarse de manera obligatoria en *Mobile-First*. Significa que los botones deben medir al menos 44x44 pixeles (ley de Fitts para dedos) y las fuentes ser legibles sin hacer zoom.

---

### H. Panel de Voz del Usuario (Tabla de Feedback Cualitativo)
*   **Qué se está midiendo:** Las opiniones directas en texto en bruto de los usuarios, separadas en Dificultades, Frustraciones y Sugerencias, limpiando y filtrando los campos vacíos.
*   **Por qué se eligió este componente:** Una tabla estructurada con íconos e IDs permite el escaneo rápido de párrafos textuales, evitando al diseñador tener que bucear en la hoja de cálculo cruda de Google Sheets.
*   **En qué nos podemos fijar:** En la repetición de **palabras clave o patrones**. Si tres usuarios distintos mencionan en Dificultades la palabra "Pagar", "Transferencia" o "Cuenta", hemos hallado la causa raíz.
*   **Para qué sirve y qué se puede mejorar:** Los 7 gráficos cuantitativos anteriores nos dicen de forma contundente **DÓNDE** y **CUÁNDO** falla el sistema. Pero no pueden decirnos **QUÉ ES EXACTAMENTE** lo que ocurre. La tabla cualitativa es el eslabón final; es la que explica el "por qué". Si los números dicen que el flujo se cae en el Carrito, la Voz del Usuario nos dirá: *"No sabía cómo borrar un elemento"*, dictándonos directamente el requerimiento técnico que debe pasar a código.
