import * as fs from 'fs';
import { City } from './model/city';
import { CitiesWorkflow } from './workflows/cities-workflow';

const init = () => {
  const jsonCities = fs.readFileSync('cities.json', 'utf8');
  const cities: City[] = JSON.parse(jsonCities);

  const workflow = new CitiesWorkflow(cities);
  workflow.run();
};

init();
