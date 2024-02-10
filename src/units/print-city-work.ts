import {
  DefaultWorkReport,
  Work,
  WorkContext,
  WorkReport,
  WorkStatus,
} from '@rs-box/ez-flow';
import { City } from '../model/city';
import { ContextKey } from '../enums/context-key.enum';

export class PrintCityWork implements Work {
  private city: City;

  getName() {
    return 'print city work';
  }

  async call(workContext: WorkContext): Promise<WorkReport> {
    this.getCurrentCity(workContext);
    console.log(this.city.name);

    return new DefaultWorkReport(WorkStatus.COMPLETED, workContext);
  }

  private getCurrentCity(workContext: WorkContext) {
    const cityIndex: number = workContext.get(ContextKey.CITY_INDEX);
    const cities: City[] = workContext.get(ContextKey.CONTEXT_CITIES);

    this.city = cities[cityIndex];
  }
}
