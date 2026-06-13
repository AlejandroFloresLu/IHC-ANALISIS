import Papa from 'papaparse';

const PRE_TEST_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSU_i7XyV_vzkJShtNIvf3kQpawnm3U4WXa-KVD3S6MsewOP1dOoWZGxNNLLumG44-T5RI3hno5z_hr/pub?gid=793794636&single=true&output=csv";
const POST_TEST_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSU_i7XyV_vzkJShtNIvf3kQpawnm3U4WXa-KVD3S6MsewOP1dOoWZGxNNLLumG44-T5RI3hno5z_hr/pub?gid=111555160&single=true&output=csv";

// Likert mapping to numeric 1-5
const likertMap = {
  "Totalmente en desacuerdo": 1,
  "En desacuerdo": 2,
  "Neutral": 3,
  "De acuerdo": 4,
  "Totalmente de acuerdo": 5
};

function mapLikertToNumber(val) {
  if (!val) return 3;
  return likertMap[val.trim()] || 3; // Default to neutral if unmatched
}

export const fetchData = async () => {
  try {
    const [preTestRes, postTestRes] = await Promise.all([
      fetch(PRE_TEST_URL),
      fetch(POST_TEST_URL)
    ]);

    const preTestCsv = await preTestRes.text();
    const postTestCsv = await postTestRes.text();

    const preTestJson = Papa.parse(preTestCsv, { header: true, skipEmptyLines: true }).data;
    const postTestJson = Papa.parse(postTestCsv, { header: true, skipEmptyLines: true }).data;

    return processMetrics(preTestJson, postTestJson);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function processMetrics(preTest, postTest) {
  // 1. Demographics and Channels (Pre-test)
  const ageDistribution = countOccurrences(preTest, "¿En qué rango de edad se encuentra? ");
  const deviceDistribution = countOccurrences(preTest, "¿Desde qué dispositivo realiza la mayoría de sus consultas y compras en línea?  ");
  const abandonmentReasons = countOccurrences(preTest, "¿Cuál es la principal razón por la que usted decide ABANDONAR una compra en una página web?  ");

  // 2. Usability Index (Post-test)
  // Mapping boolean-like questions to numbers? Wait, the questions in the prompt mentioned:
  // "Fácil navegación, consistencia de UI, claridad de información"
  // Let's use the columns that look like Likert or similar. 
  // Easy navigation: "Resultó fácil navegar por la página y encontrar los productos que buscaba"
  // UI consistency: "El diseño visual, los botones y los menús funcionan de la misma manera en todo el sitio web, sin cambios confusos.  "
  // Information clarity: "La información sobre los productos (precios, descripciones, flores incluidas, carrito) es fácil de leer"
  
  let easyNavTotal = 0, uiConsistencyTotal = 0, infoClarityTotal = 0;
  let count = postTest.length;

  postTest.forEach(row => {
    easyNavTotal += mapLikertToNumber(row["Resultó fácil navegar por la página y encontrar los productos que buscaba"]);
    uiConsistencyTotal += mapLikertToNumber(row["El diseño visual, los botones y los menús funcionan de la misma manera en todo el sitio web, sin cambios confusos.  "]);
    infoClarityTotal += mapLikertToNumber(row["La información sobre los productos (precios, descripciones, flores incluidas, carrito) es fácil de leer"]);
  });

  const usabilityMetrics = {
    labels: ['Fácil navegación', 'Consistencia de UI', 'Claridad de información'],
    data: [
      easyNavTotal / count || 0,
      uiConsistencyTotal / count || 0,
      infoClarityTotal / count || 0
    ]
  };

  // 3. Frustration Rate (Post-test)
  // KPI card % of users answering "Sí" to "Durante las tareas que realizó en nuestro sitio, ¿Hubo algún momento en que se sintio frustrado(a) o con ganas de abandonar la página?"
  const frustrationCol = "Durante las tareas que realizó en nuestro sitio, ¿Hubo algún momento en que se sintio frustrado(a) o con ganas de abandonar la página?";
  const frustratedUsers = postTest.filter(row => row[frustrationCol]?.trim()?.toLowerCase() === "sí").length;
  const frustrationRate = (frustratedUsers / count) * 100;

  // 4. Process Difficulty Funnel
  // "Ordene los siguientes pasos del proceso de compra. (Seleccione un opción diferente para cada paso). [Buscar el arreglo floral]"
  // Phases: Buscar, Carrito, Datos de entrega, Confirmar
  // Let's aggregate counts for each phase
  const phases = [
    { key: "Buscar el arreglo floral", label: "Buscar" },
    { key: "Agregar al carrito", label: "Carrito" },
    { key: "Llenar datos de entrega", label: "Datos de entrega" },
    { key: "Confirmar la compra", label: "Confirmar" }
  ];

  const difficultyLevels = ["Muy fácil", "Fácil", "Neutral", "Difícil", "Muy difícil"];
  const funnelData = phases.map(phase => {
    const colName = `Ordene los siguientes pasos del proceso de compra. (Seleccione un opción diferente para cada paso). [${phase.key}]`;
    const counts = {};
    difficultyLevels.forEach(lvl => counts[lvl] = 0);
    
    postTest.forEach(row => {
      let val = row[colName]?.trim();
      // capitalize first letter to match mapping
      if(val) {
        val = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
        if(counts[val] !== undefined) counts[val]++;
      }
    });
    
    return {
      phase: phase.label,
      ...counts
    };
  });

  // 5. System Attributes (Radar)
  const radarCols = [
    { key: "Evalúe qué tan de acuerdo está con las siguientes afirmaciones sobre los atributos del sitio web [El diseño visual es atractivo y agradable.]", label: "Estética Visual" },
    { key: "Evalúe qué tan de acuerdo está con las siguientes afirmaciones sobre los atributos del sitio web [La velocidad de carga del sitio es rápida.]", label: "Rendimiento" },
    { key: "Evalúe qué tan de acuerdo está con las siguientes afirmaciones sobre los atributos del sitio web [El texto de la página se lee con facilidad y sin esfuerzo.]", label: "Legibilidad" },
    { key: "Evalúe qué tan de acuerdo está con las siguientes afirmaciones sobre los atributos del sitio web [La navegación y el uso del menú son claros.]", label: "Navegación" }
  ];

  const systemAttributes = {
    labels: radarCols.map(c => c.label),
    data: radarCols.map(c => {
      let sum = 0;
      postTest.forEach(row => sum += mapLikertToNumber(row[c.key]));
      return sum / count || 0;
    })
  };

  // 6. Component Evaluation (Bars)
  const compCols = [
    { key: "Sentí que tenía el control total sobre mi carrito para modificar cantidades o eliminar productos de manera rápida.", label: "Control de Carrito" },
    { key: "Me sentí seguro(a) y confiado(a) al avanzar hacia la pantalla de confirmación y ver los datos para la transferencia bancaria.", label: "Confianza en Pago" },
    { key: "El formulario para registrar los datos en la sección pedidos especiales, fue fácil de completar.", label: "Formulario de Pedidos" },
    { key: "El ícono de WhatsApp que aparece en la página es fácil de notar y me parece útil. ", label: "Visibilidad WhatsApp" }
  ];

  const componentEvaluations = {
    labels: compCols.map(c => c.label),
    data: compCols.map(c => {
      let sum = 0;
      postTest.forEach(row => sum += mapLikertToNumber(row[c.key]));
      return sum / count || 0;
    })
  };

  // 7. Qualitative Feedback
  const qualitativeFeedback = postTest.map((row, index) => {
    return {
      id: index + 1,
      difficulty: row["¿Tuvo dificultad para encontrar algún botón, sección o información dentro de la página? ¿Cuál? "]?.trim(),
      frustration: row["¿En qué tarea o sección fue y por qué? (Responda únicamente si su respuesta anterior fue \"Sí\")"]?.trim(),
      suggestion: row["Si pudiera cambiar o agregar algo en el diseño de esta página, ¿Qué haría? "]?.trim()
    }
  }).filter(item => (item.difficulty && item.difficulty.length > 2) || (item.frustration && item.frustration.length > 2) || (item.suggestion && item.suggestion.length > 2));

  return {
    demographics: {
      age: ageDistribution,
      devices: deviceDistribution,
      abandonment: abandonmentReasons
    },
    usability: usabilityMetrics,
    frustrationRate: frustrationRate,
    funnel: funnelData,
    systemAttributes,
    componentEvaluations,
    qualitativeFeedback
  };
}

function countOccurrences(data, columnName) {
  const counts = {};
  data.forEach(row => {
    let val = row[columnName]?.trim();
    if (!val) val = "No especificado";
    counts[val] = (counts[val] || 0) + 1;
  });
  // Convert to chart format
  return {
    labels: Object.keys(counts),
    data: Object.values(counts)
  };
}
