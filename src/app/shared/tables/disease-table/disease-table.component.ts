import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Disease} from "../../../model/disease";
import {Treatment} from "../../../model/treatment";
import {AppState} from "../../../state/app.reducer";
import {Store} from "@ngrx/store";
import {map} from "rxjs";
import {PageableGenericResponse} from "../../pageable/pageable-generic-response";
import {FetchUserDiseaseAction} from "../../../state/medical/medical.action";
import {Pageable} from "../../pageable/pageable";

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

  transformedData: Disease[] = [];

  expandedRows: Set<number> = new Set();

  rowsKey: Map<string, Iterable<string>> = new Map<string, string[]>();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(FetchUserDiseaseAction({
        pagination: {
          page: 1, size: 10
        }
      }
    ));

    this.store.select('medical')
      .pipe(map(state => state.userDisease))
      .subscribe(response => {
        if (!!response) {
          this.updateTable(response)
        }
      });
  }

  toggleRow(index: number): void {
    if (this.expandedRows.has(index)) {
      this.expandedRows.delete(index);
    } else {
      this.expandedRows.add(index);
    }
  }

  getRowKeys(diseaseName: string) {
    return this.rowsKey.get(diseaseName);
  }


  isRowExpanded(index: number): boolean {
    return this.expandedRows.has(index);
  }

  updateTable(data: PageableGenericResponse<Disease>): void {
    this.transformedData = [];

    data.payload.forEach((disease: any) => {
      let treatmentsMap: Map<string, Treatment[]> = new Map<string, Treatment[]>();
      this.rowsKey.set(disease.diseaseName, Object.keys(disease.treatments))
      Object.keys(disease.treatments).forEach(treatmentKey => {
        const treatments = disease.treatments[treatmentKey];

        let diseaseTreatments: Treatment[] = []
        treatments.forEach((treatment: any) => {
          diseaseTreatments.push(new Treatment('', treatment.description));
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
    let newPageable: Pageable = {page: pageNumber, size: this.pageSize};
    this.store.dispatch(FetchUserDiseaseAction({pagination: newPageable}));
  }

  protected readonly Object = Object;
}
