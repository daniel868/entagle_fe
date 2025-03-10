export class Mocks {
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

  static get qualification(): string[] {
    return this._qualification;
  }
}

