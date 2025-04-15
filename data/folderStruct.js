// Creates a folder structure from the test paths in mainData.

import { mainData } from './mainData.js';

export const folderStruct = {};

mainData.forEach((elem) => {
  const pathBlock = elem.test.split('/');
  const file = pathBlock.pop().slice(0, -2);
  const folder = pathBlock.pop();

  folderStruct[folder] = folderStruct[folder] || [];
  // console.log(folderStruct);

  folderStruct[folder].push(file);
});
// console.log(folderStruct);
