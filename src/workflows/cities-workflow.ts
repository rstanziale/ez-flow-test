import {
  ParallelFlow,
  RepeatFlow,
  SequentialFlow,
  WorkContext,
  WorkFlowEngine,
  WorkFlowEngineBuilder,
  WorkReport,
  WorkStatus,
} from '@rs-box/ez-flow';
import { ContextKey } from '../enums/context-key.enum';
import { City } from '../model/city';
import { ValidateContextWork } from '../units/validate-context-work';
import { IsNotLastCityPredicate } from '../predicates/is-not-last-city-predicate';
import { PrintCityWork } from '../units/print-city-work';
import { RegionCity } from '../units/region-city-work';

export class CitiesWorkflow {
  private cities: City[];

  constructor(cities: City[]) {
    this.cities = cities;
  }

  run() {
    // set needed attributes in workContext
    const workContext = new WorkContext();
    workContext.set(ContextKey.CONTEXT_CITIES, this.cities);

    const workflow = SequentialFlow.Builder.newFlow()
      .withName('Main workflow')
      .addWork(new ValidateContextWork())
      .addWork(
        RepeatFlow.Builder.newFlow()
          .withName('Loop on cities')
          .withWork(
            ParallelFlow.Builder.newFlow()
              .withName('Operations on a city')
              .withWorks([new PrintCityWork(), new RegionCity()])
              .build(),
          )
          .until(new IsNotLastCityPredicate())
          .build(),
      )
      .build();

    // Run workflow
    const workFlowEngine: WorkFlowEngine =
      WorkFlowEngineBuilder.newBuilder().build();

    workFlowEngine.run(workflow, workContext).then(
      (finalReport: WorkReport) => {
        if (finalReport.getWorkStatus() === WorkStatus.COMPLETED) {
          // Completed successfully
          console.log('Completed successfully');
        } else {
          // There was a failure
          const err = finalReport.getError();
          // Show error...
          console.error('error: ', err);
        }
      },
      err => {
        console.error('general error: ', err);
      },
    );
  }
}
