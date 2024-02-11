import {
  ParallelWorkReport,
  Predicate,
  WorkContext,
  WorkReport,
} from '@rs-box/ez-flow';
import { City } from '../model/city';
import { ContextKey } from '../enums/context-key.enum';

export class IsNotLastCityPredicate implements Predicate {
  private currentCityIndex: number;
  private contextCities: City[];

  async apply(workReport: WorkReport): Promise<boolean> {
    this.initializeInput(workReport.getWorkContext());

    const response = ++this.currentCityIndex !== this.contextCities.length;
    this.generateOutput(workReport);

    return response;
  }

  private initializeInput(workContext: WorkContext) {
    this.currentCityIndex = workContext.get(ContextKey.CITY_INDEX);
    this.contextCities = workContext.get(ContextKey.CONTEXT_CITIES);
  }

  private generateOutput(workReport: WorkReport) {
    if (workReport instanceof ParallelWorkReport) {
      // Update the context for each work report
      workReport.getWorkList().forEach((work: WorkReport) => {
        work.getWorkContext().set(ContextKey.CITY_INDEX, this.currentCityIndex);
      });
    } else {
      workReport
        .getWorkContext()
        .set(ContextKey.CITY_INDEX, this.currentCityIndex);
    }
  }
}
