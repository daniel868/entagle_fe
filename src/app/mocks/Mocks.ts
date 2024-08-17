import {Patient} from "../model/patient";
import {Treatment} from "../model/treatment";

export class Mocks {
  private static _patients: Patient[] = [
    new Patient('asthma',
      [
        new Treatment('D1 Physical', 'figure IAO'),
        new Treatment('D2 Social', 'investigate relationship with brother'),
        new Treatment('D7 Spiritual', 'meditation the right chakra')])
  ]

  private static _qualification = [
    'D1 Physical',
    'D2 Social',
    'D3 Occupational',
    'D4 Emotional',
    'D5 Intellectual',
    'D6 Environmental',
    'D7 Spiritual'
  ]

  constructor() {

  }

  static get patients(): Patient[] {
    return this._patients;
  }

  static get qualification(): string[] {
    return this._qualification;
  }
}

