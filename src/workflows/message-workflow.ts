import {
  ConditionalFlow,
  SequentialFlow,
  RepeatFlow,
  ParallelFlow,
  WorkFlowEngine,
  WorkStatus,
  WorkContext,
  WorkFlowEngineBuilder,
  WorkReport,
} from '@rs-box/ez-flow';
import { PrintMessageWork } from '../units/print-message-work';

export class MessageWorkflow {
  private work1: PrintMessageWork;
  private work2: PrintMessageWork;
  private work3: PrintMessageWork;
  private work4: PrintMessageWork;
  private work5: PrintMessageWork;

  constructor() {
    this.work1 = new PrintMessageWork('foo');
    this.work2 = new PrintMessageWork('hello');
    this.work3 = new PrintMessageWork('world');
    this.work4 = new PrintMessageWork('ok');
    this.work5 = new PrintMessageWork('nok');
  }

  run() {
    const workflow = SequentialFlow.Builder.newFlow() // flow 4
      .addWork(
        RepeatFlow.Builder.newFlow() // flow 1
          .withName('print foo')
          .withWork(this.work1)
          .withTimes(3)
          .build(),
      )
      .addWork(
        ConditionalFlow.Builder.newFlow() // flow 3
          .withWork(
            ParallelFlow.Builder.newFlow() // flow 2
              .withName('print hello world')
              .addWork(this.work2)
              .addWork(this.work3)
              .build(),
          )
          .then(this.work4)
          .otherwise(this.work5)
          .build(),
      )
      .build();

    // set needed attributes in workContext
    const workContext = new WorkContext();

    // 3. Run workflow
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
