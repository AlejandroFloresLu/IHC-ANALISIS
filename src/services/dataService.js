import Papa from 'papaparse';

const PRE_TEST_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSU_i7XyV_vzkJShtNIvf3kQpawnm3U4WXa-KVD3S6MsewOP1dOoWZGxNNLLumG44-T5RI3hno5z_hr/pub?gid=793794636&single=true&output=csv";
const POST_TEST_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSU_i7XyV_vzkJShtNIvf3kQpawnm3U4WXa-KVD3S6MsewOP1dOoWZGxNNLLumG44-T5RI3hno5z_hr/pub?gid=111555160&single=true&output=csv";

// Nuevos links de Tareas
const TASK1_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSU_i7XyV_vzkJShtNIvf3kQpawnm3U4WXa-KVD3S6MsewOP1dOoWZGxNNLLumG44-T5RI3hno5z_hr/pub?gid=1905174318&single=true&output=csv";
const TASK2_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSU_i7XyV_vzkJShtNIvf3kQpawnm3U4WXa-KVD3S6MsewOP1dOoWZGxNNLLumG44-T5RI3hno5z_hr/pub?gid=1498508982&single=true&output=csv";
const TASK3_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSU_i7XyV_vzkJShtNIvf3kQpawnm3U4WXa-KVD3S6MsewOP1dOoWZGxNNLLumG44-T5RI3hno5z_hr/pub?gid=117312480&single=true&output=csv";
const TASK4_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSU_i7XyV_vzkJShtNIvf3kQpawnm3U4WXa-KVD3S6MsewOP1dOoWZGxNNLLumG44-T5RI3hno5z_hr/pub?gid=1253418288&single=true&output=csv";

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
    const [preTestRes, postTestRes, t1Res, t2Res, t3Res, t4Res] = await Promise.all([
      fetch(PRE_TEST_URL),
      fetch(POST_TEST_URL),
      fetch(TASK1_URL),
      fetch(TASK2_URL),
      fetch(TASK3_URL),
      fetch(TASK4_URL)
    ]);

    const preTestCsv = await preTestRes.text();
    const postTestCsv = await postTestRes.text();
    const t1Csv = await t1Res.text();
    const t2Csv = await t2Res.text();
    const t3Csv = await t3Res.text();
    const t4Csv = await t4Res.text();

    const preTestJson = Papa.parse(preTestCsv, { header: true, skipEmptyLines: true }).data;
    const postTestJson = Papa.parse(postTestCsv, { header: true, skipEmptyLines: true }).data;
    const t1Json = Papa.parse(t1Csv, { header: true, skipEmptyLines: true }).data;
    const t2Json = Papa.parse(t2Csv, { header: true, skipEmptyLines: true }).data;
    const t3Json = Papa.parse(t3Csv, { header: true, skipEmptyLines: true }).data;
    const t4Json = Papa.parse(t4Csv, { header: true, skipEmptyLines: true }).data;

    return processMetrics(preTestJson, postTestJson, [t1Json, t2Json, t3Json, t4Json]);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function processMetrics(preTest, postTest, tasksData) {
  // 1. Demographics and Channels (Pre-test)
  const ageDistribution = countOccurrences(preTest, "¿En qué rango de edad se encuentra? ");
  const deviceDistribution = countOccurrences(preTest, "¿Desde qué dispositivo realiza la mayoría de sus compras en línea?  ");
  const abandonmentReasons = countOccurrences(preTest, " ¿Cuál es la principal razón por la que usted decide ABANDONAR una compra en una página web?  ");
  const purchaseFrequency = countOccurrences(preTest, "¿Con qué frecuencia realiza compras (de cualquier tipo de producto) por internet?  ");

  // 2. Usability Index (Post-test)
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
  const frustrationCol = "Durante las tareas que realizó en nuestro sitio, ¿Hubo algún momento en que se sintio frustrado(a) o con ganas de abandonar la página?";
  const frustratedUsers = postTest.filter(row => row[frustrationCol]?.trim()?.toLowerCase() === "sí").length;
  const frustrationRate = count > 0 ? (frustratedUsers / count) * 100 : 0;

  // 4. Process Difficulty Funnel
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

  // 8. Tareas en Vivo (Live Tasks)
  const tasksProcessed = tasksData.map((taskSheet, index) => {
    const taskNum = index + 1;
    // Buscamos la columna de completada: usualmente "Tarea 1 (Completada)" o similar.
    const completionCol = Object.keys(taskSheet[0] || {}).find(k => k.includes(`Tarea ${taskNum}`));
    
    let successCount = 0;
    let totalAttempts = 0;
    let qualitativeNotes = [];

    taskSheet.forEach(row => {
      const idUser = row["ID Usuario"];
      if(!idUser) return; // skip empty rows
      
      totalAttempts++;
      const isCompleted = row[completionCol]?.trim()?.toLowerCase() === "sí" || row[completionCol]?.trim()?.toLowerCase() === "si";
      if (isCompleted) successCount++;

      const errors = row["Errores / Clics Compulsivos"]?.trim();
      const frustration = row["Gestos de Frustración"]?.trim();
      const notes = row["Notas del Observador"]?.trim();
      const time = row["Tiempo"]?.trim();

      qualitativeNotes.push({
        user: idUser,
        errors: errors || "-",
        frustration: frustration || "-",
        notes: notes || "-",
        time: time || "-"
      });
    });

    return {
      taskNumber: taskNum,
      successRate: totalAttempts > 0 ? (successCount / totalAttempts) * 100 : 0,
      qualitativeNotes
    };
  });

  return {
    demographics: {
      age: ageDistribution,
      devices: deviceDistribution,
      abandonment: abandonmentReasons,
      frequency: purchaseFrequency
    },
    usability: usabilityMetrics,
    frustrationRate: frustrationRate,
    funnel: funnelData,
    systemAttributes,
    componentEvaluations,
    qualitativeFeedback,
    tasks: tasksProcessed // <-- Exposing tasks metrics
  };
}

function countOccurrences(data, columnName) {
  const counts = {};
  data.forEach(row => {
    let val = row[columnName]?.trim();
    if (!val) val = "No especificado";
    counts[val] = (counts[val] || 0) + 1;
  });
  return {
    labels: Object.keys(counts),
    data: Object.values(counts)
  };
}
