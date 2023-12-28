import { Predicate } from '@rs-box/ez-flow';

export class AlwaysTruePredicate implements Predicate {
  async apply() {
    return true;
  }
}
