import {Treatment} from "./treatment";
import {Patient} from "./patient";

export class Disease {
  id: number;
  diseaseName: string;
  patientSituation: string;
  treatments: Treatment[];
  patientInfo: Patient;
}
