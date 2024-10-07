import {Treatment} from "./treatment";

export class Disease {
  diseaseName: string;
  treatments: Map<string, Treatment[]>
}
