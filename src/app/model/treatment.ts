import {TreatmentItem} from "./treatment-item";

export class Treatment {
  public id: number;
  public category: string;
  public description: string;
  public specialistName: string;
  public items: TreatmentItem[];

  constructor(category: string, description: string) {
    this.category = category;
    this.description = description;
  }
}
