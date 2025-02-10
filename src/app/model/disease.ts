import {Treatment} from "./treatment";

export class Disease {
  id: number;
  diseaseName: string;
  patientSituation: string;
  treatments: Treatment[];
}
