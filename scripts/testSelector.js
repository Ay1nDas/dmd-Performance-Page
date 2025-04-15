import { folderStruct } from '../data/folderStruct.js';
import { mainData } from '../data/mainData.js';
import { prData } from '../data/prData.js';
import { dataProperties } from './propertiesTest.js';
import { displayChart } from './compChart.js';

export function loadTests() {
  const testSelector = document.querySelector('.js-test-filter');

  let testHTML = '';
  // console.log(folderStruct);

  Object.entries(folderStruct).forEach(([folder, files]) => {
    // console.log(folder);
    // console.log(files);
    testHTML += `<div class="${folder}-test">
        <p>${folder} tests</p>`;
    files.forEach((file) => {
      const foundTest = dataProperties.find((t) => t.test === file);
      testHTML += `
        <label >
          <input type="checkbox" name="items" class="js-test-block js-${file}-block" data-test="${file}" value="${file}" ${
        foundTest.checked ? 'checked' : ''
      } /> Test ${file}
        </label>
        `;
    });
  });
  // console.log(testHTML);
  testSelector.innerHTML = testHTML;
  changeTests();
}

function changeTests() {
  // console.log('ran now');
  document.querySelectorAll('.js-test-block').forEach((block) => {
    block.addEventListener('click', (event) => {
      const value = event.target.dataset.test;
      // console.log(value);

      const foundTest = dataProperties.find((t) => t.test === value);
      foundTest.checked = !foundTest.checked;
      // console.log(dataProperties);
      loadTestData();
    });
  });
}

export function loadTestData() {
  const mainDataSelected = {
    userTime: 0,
    sysTime: 0,
    cpuUse: '99%',
    maxRam: 0,
  };
  const prDataSelected = {
    userTime: 0,
    sysTime: 0,
    cpuUse: '99%',
    maxRam: 0,
  };
  const selectedTests = dataProperties.filter((t) => t.checked);
  // console.log(selectedTests);

  selectedTests.forEach((test) => {
    const foundTest = mainData.find((t) => t.test.includes(test.test));
    if (foundTest) {
      mainDataSelected.userTime += foundTest.userTime;
      mainDataSelected.sysTime += foundTest.sysTime;
      if (mainDataSelected.maxRam < foundTest.maxRam) {
        mainDataSelected.maxRam = foundTest.maxRam;
      }
    }
  });

  selectedTests.forEach((test) => {
    const foundTest = prData.find((t) => t.test.includes(test.test));
    if (foundTest) {
      prDataSelected.userTime += foundTest.userTime;
      prDataSelected.sysTime += foundTest.sysTime;
      if (prDataSelected.maxRam < foundTest.maxRam) {
        prDataSelected.maxRam = foundTest.maxRam;
      }
    }
  });

  displayTestData(mainDataSelected, prDataSelected);
  displayChart(mainDataSelected, prDataSelected);
}

function displayTestData(mainDataSelected, prDataSelected) {
  // console.log(mainDataSelected);
  // console.log(prDataSelected);

  const table = document.querySelector('.js-test-table');

  const mainUserTime = mainDataSelected.userTime.toFixed(2);
  const prUserTime = prDataSelected.userTime.toFixed(2);
  const userTimeDelta = (mainUserTime - prUserTime).toFixed(2);

  const mainSysTime = mainDataSelected.sysTime.toFixed(2);
  const prSysTime = prDataSelected.sysTime.toFixed(2);
  const sysTimeDelta = (mainSysTime - prSysTime).toFixed(2);

  const mainMaxRam = mainDataSelected.maxRam;
  const prMaxRam = prDataSelected.maxRam;
  const maxRamDelta = (mainMaxRam - prMaxRam).toFixed(2);

  table.innerHTML = `
    <table>
      <tr>
        <th>Branch</th>
        <th>master</th>
        <th>PR</th>
        <th>delta (Master-Pr)</th>
      </tr>

      <tr>
        <td>User Time (Seconds)</td>
        <td>${mainUserTime}</td>
        <td>${prUserTime}</td>
        <td class="${
          userTimeDelta >= 0 ? 'pos-val' : 'neg-val'
        }">${userTimeDelta}</td>
      </tr>

      <tr>
        <td>System Time (Seconds)</td>
        <td>${mainSysTime}</td>
        <td>${prSysTime}</td>
        <td class="${
          sysTimeDelta >= 0 ? 'pos-val' : 'neg-val'
        }">${sysTimeDelta}</td>
      </tr>

      <tr>
        <td>CPU Usage</td>
        <td>99%</td>
        <td>99%</td>
        <td>0%</td>
      </tr>

      <tr>
        <td>Max Memory (Kb)</td>
        <td>${mainMaxRam}</td>
        <td>${prMaxRam}</td>
        <td class="${
          maxRamDelta >= 0 ? 'pos-val' : 'neg-val'
        }">${maxRamDelta}</td>
      </tr>
    </table>`;

  // console.log(tableHTML);
}
