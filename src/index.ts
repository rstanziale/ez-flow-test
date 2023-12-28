import { MessageWorkflow } from './workflows/message-workflow';

const init = () => {
  const workflow = new MessageWorkflow();
  workflow.run();
};

init();
