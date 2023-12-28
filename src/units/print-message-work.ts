import {
  Work,
  WorkContext,
  WorkReport,
  DefaultWorkReport,
  WorkStatus,
} from '@rs-box/ez-flow';

export class PrintMessageWork implements Work {
  private message: string;

  constructor(message: string) {
    this.message = message;
  }

  getName() {
    return 'print message work';
  }

  async call(workContext: WorkContext): Promise<WorkReport> {
    console.log(this.message);
    return new DefaultWorkReport(WorkStatus.COMPLETED, workContext);
  }
}
