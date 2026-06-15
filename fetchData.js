import fs from 'fs';

async function fetchRealData() {
  const PRE_TEST_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSU_i7XyV_vzkJShtNIvf3kQpawnm3U4WXa-KVD3S6MsewOP1dOoWZGxNNLLumG44-T5RI3hno5z_hr/pub?gid=793794636&single=true&output=csv";
  const POST_TEST_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSU_i7XyV_vzkJShtNIvf3kQpawnm3U4WXa-KVD3S6MsewOP1dOoWZGxNNLLumG44-T5RI3hno5z_hr/pub?gid=111555160&single=true&output=csv";
  const TASK1_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSU_i7XyV_vzkJShtNIvf3kQpawnm3U4WXa-KVD3S6MsewOP1dOoWZGxNNLLumG44-T5RI3hno5z_hr/pub?gid=1905174318&single=true&output=csv";
  const TASK2_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSU_i7XyV_vzkJShtNIvf3kQpawnm3U4WXa-KVD3S6MsewOP1dOoWZGxNNLLumG44-T5RI3hno5z_hr/pub?gid=1498508982&single=true&output=csv";
  const TASK3_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSU_i7XyV_vzkJShtNIvf3kQpawnm3U4WXa-KVD3S6MsewOP1dOoWZGxNNLLumG44-T5RI3hno5z_hr/pub?gid=117312480&single=true&output=csv";
  const TASK4_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSU_i7XyV_vzkJShtNIvf3kQpawnm3U4WXa-KVD3S6MsewOP1dOoWZGxNNLLumG44-T5RI3hno5z_hr/pub?gid=1253418288&single=true&output=csv";
  
  const [pre, post, t1, t2, t3, t4] = await Promise.all([
    fetch(PRE_TEST_URL), 
    fetch(POST_TEST_URL),
    fetch(TASK1_URL),
    fetch(TASK2_URL),
    fetch(TASK3_URL),
    fetch(TASK4_URL)
  ]);

  const preData = await pre.text();
  const postData = await post.text();
  const t1Data = await t1.text();
  const t2Data = await t2.text();
  const t3Data = await t3.text();
  const t4Data = await t4.text();

  fs.writeFileSync('./public/mock_pre_test.csv', preData);
  fs.writeFileSync('./public/mock_post_test.csv', postData);
  fs.writeFileSync('./public/mock_task1.csv', t1Data);
  fs.writeFileSync('./public/mock_task2.csv', t2Data);
  fs.writeFileSync('./public/mock_task3.csv', t3Data);
  fs.writeFileSync('./public/mock_task4.csv', t4Data);
  
  console.log("Mock data CSVs (Pre, Post, and 4 Tasks) created in public folder.");
}

fetchRealData();
