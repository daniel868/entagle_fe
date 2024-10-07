import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Disease} from "../../../model/disease";
import {Treatment} from "../../../model/treatment";

@Component({
  selector: 'app-disease-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './disease-table.component.html',
  styleUrl: './disease-table.component.css'
})
export class DiseaseTableComponent implements OnInit {
  pageSize: number;
  currentPage: number;
  nextPage: number;
  totalCount: number;
  totalPages: number;

  diseaseData: any;
  expandedRows: Set<number> = new Set();

  ngOnInit(): void {
    this.fetchData();
  }

  toggleRow(index: number): void {
    if (this.expandedRows.has(index)) {
      this.expandedRows.delete(index);
    } else {
      this.expandedRows.add(index);
    }
  }

  isRowExpanded(index: number): boolean {
    return this.expandedRows.has(index);
  }

  transformedData: Disease[] = [];

  fetchData() {
    this.diseaseData = {
      "payload": [
        {
          "diseaseName": "disease1",
          "treatments": {
            "D1": [
              {"description": "treatment1_3"},
              {"description": "treatment1_1"}
            ],
            "D2": [
              {"description": "treatment1_2"}
            ]
          }
        },
        {
          "diseaseName": "disease2",
          "treatments": {
            "D1": [
              {"description": "treatment2_1"}
            ]
          }
        }
      ],
      "pageSize": 10,
      "currentPage": 2,
      "nextPage": 3,
      "totalCount": 100
    };
    this.updateTable(this.diseaseData);
  }

  updateTable(data: any): void {
    this.transformedData = [];

    data.payload.forEach((disease: any) => {
      let treatmentsMap: Map<string, Treatment[]> = new Map<string, Treatment[]>();
      Object.keys(disease.treatments).forEach(treatmentKey => {
        const treatments = disease.treatments[treatmentKey];

        let diseaseTreatments: Treatment[] = []
        treatments.forEach((treatment: any) => {
          diseaseTreatments.push(new Treatment('', treatment));
        });
        treatmentsMap.set(treatmentKey, diseaseTreatments);

      });
      this.transformedData.push({
        diseaseName: disease.diseaseName,
        treatments: treatmentsMap
      });
    });

    // Set pagination values
    this.pageSize = data.pageSize;
    this.currentPage = data.currentPage;
    this.nextPage = data.nextPage;
    this.totalCount = data.totalCount;

    // Calculate total pages
    this.totalPages = Math.ceil(this.totalCount / this.pageSize);
  }


  changePage(pageNumber: number) {

  }

  protected readonly Object = Object;
}
