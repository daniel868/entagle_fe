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
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-disease-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    MatPaginator
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

  diseaseCategories: string[] = ['Specialist', 'D1 Physical', 'D2 Social', 'D3 Occupational', 'D4 Emotional', 'D5 Intellectual', 'D6 Environmental', 'D7 Spiritual', 'Remedies'];

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

  isRowExpanded(index: number): boolean {
    return this.expandedRows.has(index);
  }

  updateTable(data: PageableGenericResponse<Disease>): void {
    this.transformedData = [];

    this.transformedData = data.payload;
    // Set pagination values
    this.pageSize = data.pageSize;
    this.currentPage = data.currentPage;
    this.nextPage = data.nextPage;
    this.totalCount = data.totalCount;

    // Calculate total pages
    this.totalPages = Math.ceil(this.totalCount / this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    let newPageable: Pageable = {page: this.currentPage, size: this.pageSize};
    this.store.dispatch(FetchUserDiseaseAction({pagination: newPageable}));
  }

  protected readonly Object = Object;
}
