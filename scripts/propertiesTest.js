import { mainData } from '../data/mainData.js';

export const dataProperties = [];

mainData.forEach((data) => {
  const test = data.test.split('/').pop().slice(0, -2);
  dataProperties.push({
    test: test,
    checked: true,
  });
});
