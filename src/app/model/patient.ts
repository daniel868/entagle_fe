import {Treatment} from "./treatment";

export class Patient {
  public situation: string;
  public treatments: Treatment[];

  constructor(situation: string, treatments: Treatment[]) {
    this.situation = situation;
    this.treatments = treatments;
  }

}
