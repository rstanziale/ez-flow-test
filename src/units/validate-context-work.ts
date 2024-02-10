import {
  DefaultWorkReport,
  Work,
  WorkContext,
  WorkReport,
  WorkStatus,
} from '@rs-box/ez-flow';
import { ContextKey } from '../enums/context-key.enum';

export class ValidateContextWork implements Work {
  getName() {
    return 'validate context work';
  }

  async call(workContext: WorkContext): Promise<WorkReport> {
    this.validateCities(workContext);

    return new DefaultWorkReport(WorkStatus.COMPLETED, workContext);
  }

  private validateCities(workContext: WorkContext) {
    const cities = workContext.get(ContextKey.CONTEXT_CITIES);
    if (cities == null) {
      throw new Error('No cities found!');
    }

    workContext.set(ContextKey.CITY_INDEX, 0);
  }
}
