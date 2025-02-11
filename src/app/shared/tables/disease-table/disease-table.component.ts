import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Disease} from "../../../model/disease";
import {AppState} from "../../../state/app.reducer";
import {Store} from "@ngrx/store";
import {debounceTime, map, Subscription} from "rxjs";
import {PageableGenericResponse} from "../../pageable/pageable-generic-response";
import {DeleteDiseaseAction, FetchUserDiseaseAction} from "../../../state/medical/medical.action";
import {Pageable} from "../../pageable/pageable";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {AddEditTreatmentModalComponent} from "../../modals/add-edit-treatment-modal/add-edit-treatment-modal.component";
import {WarningModalComponent} from "../../modals/warning-modal/warning-modal.component";
import {FormsModule} from "@angular/forms";
import {document} from "ngx-bootstrap/utils";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {PatientSituationModalComponent} from "../../modals/patient-situation-modal/patient-situation-modal.component";

@Component({
  selector: 'app-disease-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    MatPaginator,
    MatFormField,
    MatInput,
    MatFormFieldModule,
    FormsModule,
    TooltipModule
  ],
  templateUrl: './disease-table.component.html',
  styleUrl: './disease-table.component.css'
})
export class DiseaseTableComponent implements OnInit, OnDestroy, AfterViewInit {
  pageSize: number;
  currentPage: number;
  nextPage: number;
  totalCount: number;
  totalPages: number;

  transformedData: Disease[] = [];

  expandedRows: Set<number> = new Set();

  dropdownItemRows: Set<number> = new Set();

  diseaseCategories: string[] = ['Specialist',
    'D1 Physical',
    'D2 Social',
    'D3 Occupational',
    'D4 Emotional',
    'D5 Intellectual',
    'D6 Environmental',
    'D7 Spiritual',
    'Remedies',
    'Nutrition',
    'Other requirements'];

  searchString: string = '';

  searchStringEventEmitter: EventEmitter<string> = new EventEmitter<string>();

  tableDataSubscription: Subscription;
  searchStringSubscription: Subscription;

  @ViewChild('dropdownItemRows', {static: false})
  dropDownItemRef: ElementRef;

  constructor(private store: Store<AppState>,
              private bsModalService: BsModalService) {
  }

  ngOnInit(): void {
    this.store.dispatch(FetchUserDiseaseAction({
        pagination: {page: 1, size: 10},
        searchString: this.searchString
      }
    ));

    this.tableDataSubscription = this.store.select('medical')
      .pipe(map(state => state.userDisease))
      .subscribe(response => {
        if (!!response) {
          this.updateTable(response)
        }
      });

    this.searchStringSubscription = this.searchStringEventEmitter.pipe(
      debounceTime(300)
    ).subscribe((newValue) => {
      this.store.dispatch(FetchUserDiseaseAction({
          pagination: {page: 1, size: 10},
          searchString: this.searchString
        }
      ));
    });

  }

  ngAfterViewInit(): void {

  }


  toggleRow(index: number): void {
    if (this.expandedRows.has(index)) {
      this.expandedRows.delete(index);
    } else {
      this.expandedRows.add(index);
    }
  }

  toggleDropdownMenu(index: number) {
    if (this.dropdownItemRows.has(index)) {
      this.dropdownItemRows.delete(index);
    } else {
      this.dropdownItemRows.add(index);
    }
  }

  isDropdownMenuOpen(index: number) {
    return this.dropdownItemRows.has(index);
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
    this.store.dispatch(FetchUserDiseaseAction({pagination: newPageable, searchString: this.searchString}));
  }

  protected readonly Object = Object;

  onAddNewTreatmentModal(diseaseId: number) {
    const initialState = {
      addDisease: false,
      diseaseId: diseaseId
    };
    const modalOptions: ModalOptions = {
      initialState: initialState,
      backdrop: true,  // Enables backdrop click to close the modal
      keyboard: true,  // Close the modal when pressing escape
    };
    this.bsModalService.show(AddEditTreatmentModalComponent, modalOptions)
  }

  onDeleteDiseaseClick(diseaseId: number) {
    const initialState = {
      message: 'Are you sure you want to delete it?',
      confirmClickAction: () => {
        this.dispatchDiseaseDelete(diseaseId);
      }
    };
    const modalOptions: ModalOptions = {
      initialState: initialState,
      backdrop: true,  // Enables backdrop click to close the modal
      keyboard: true,  // Close the modal when pressing escape
    };

    this.bsModalService.show(WarningModalComponent, modalOptions);
  }

  dispatchDiseaseDelete(diseaseId: number) {
    this.store.dispatch(DeleteDiseaseAction({diseaseId: diseaseId}));
  }

  @HostListener('document:click', ['$event'])
  onPageClick(event: MouseEvent) {
    if (this.dropDownItemRef) {
      if (this.dropdownItemRows.size != 0 && !this.dropDownItemRef.nativeElement.contains(event.target)) {
        this.dropdownItemRows.clear();
      }
    }
  }

  onAddDisease() {
    const initialState = {
      addDisease: true,
      modalTitle: 'Add new recommendation'
    };
    const modalOptions: ModalOptions = {
      initialState: initialState,
      backdrop: true,  // Enables backdrop click to close the modal
      keyboard: true,  // Close the modal when pressing escape
    };
    this.bsModalService.show(AddEditTreatmentModalComponent, modalOptions)
  }

  ngOnDestroy(): void {
    if (this.tableDataSubscription) {
      this.tableDataSubscription.unsubscribe();
    }
    if (this.searchStringSubscription) {
      this.searchStringSubscription.unsubscribe();
    }
  }


  onSearchStringChange(newValue: string) {
    this.searchStringEventEmitter.emit(newValue);
  }

  onPatientInfoClick(patientSituation: string) {
    if (patientSituation !== null) {
      const initialState = {
        patientSituation: patientSituation
      };
      const modalOptions: ModalOptions = {
        initialState: initialState,
        backdrop: true,  // Enables backdrop click to close the modal
        keyboard: true,  // Close the modal when pressing escape
      };
      this.bsModalService.show(PatientSituationModalComponent, modalOptions)
    }
  }
}
