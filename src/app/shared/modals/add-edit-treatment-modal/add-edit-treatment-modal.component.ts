import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {TreatmentItem} from "../../../model/treatment-item";
import {AppState} from "../../../state/app.reducer";
import {Store} from "@ngrx/store";
import {
  AddNewDiseaseAction,
  AddNewTreatmentAction, FetchTreatmentItemAction,
  FetchUserDiseaseAction
} from "../../../state/medical/medical.action";
import {Event} from "@angular/router";
import {debounceTime, map, Subscription} from "rxjs";

@Component({
  selector: 'app-add-edit-treatment-modal',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './add-edit-treatment-modal.component.html',
  styleUrl: './add-edit-treatment-modal.component.css'
})
export class AddEditTreatmentModalComponent implements OnInit, OnDestroy {

  @Input()
  addDisease: boolean = false;

  @Input()
  diseaseId: number;

  @Input()
  modalTitle: string = 'Add new treatment'

  addEditTreatmentForm: FormGroup;

  showCategoryDropdown: boolean = false;
  showItemDropdown: boolean = false;

  treatmentType: string[] = ['D1 Physical',
    'D2 Social',
    'D3 Occupational',
    'D4 Emotional',
    'D5 Intellectual',
    'D6 Environmental',
    'D7 Spiritual']

  selectedTreatmentType: string = this.treatmentType[0];

  treatments: TreatmentItem[] = []

  itemTypeEventEmitter: EventEmitter<string> = new EventEmitter<string>();
  itemTypeSubscription: Subscription;

  availableTreatmentItems: TreatmentItem[];
  treatmentItemsSubscription: Subscription;

  constructor(private bsModalRef: BsModalRef,
              private store: Store<AppState>) {
    this.addEditTreatmentForm = new FormGroup({
      inputTreatmentDescription: new FormControl('', [Validators.required]),
      inputCondition: new FormControl('', [Validators.required])
    });

  }

  ngOnInit(): void {
    this.itemTypeSubscription = this.itemTypeEventEmitter.pipe(
      debounceTime(300)
    ).subscribe(newValue => {
      this.store.dispatch(FetchTreatmentItemAction({searchString: newValue}));
    });

    this.treatmentItemsSubscription = this.store.select('medical').pipe(
      map((state) => state.treatmentItems)
    ).subscribe(items => {
      this.availableTreatmentItems = items;
    });

  }

  onCategoryBtnClicked() {
    this.showCategoryDropdown = !this.showCategoryDropdown;
  }

  closeModal() {
    if (this.bsModalRef) {
      this.bsModalRef.hide();
    }
  }

  onTreatmentTypeChange(newValue: string) {
    this.selectedTreatmentType = newValue;
    this.showCategoryDropdown = !this.showCategoryDropdown;
  }

  onAddCircumstanceBtnClicked() {
    this.treatments.push({
      description: this.addEditTreatmentForm.get('inputTreatmentDescription')?.value,
      type: this.selectedTreatmentType
    });
    this.treatmentType = this.treatmentType.filter((category) => category !== this.selectedTreatmentType);
    this.selectedTreatmentType = this.treatmentType[0];
    this.addEditTreatmentForm.get('inputTreatmentDescription')?.setValue('')
  }

  onDeleteTreatmentCategoryBtn(currentTreatment: TreatmentItem) {
    this.treatmentType.push(currentTreatment.type);
    this.treatments = this.treatments.filter((current) => current !== currentTreatment);
  }

  onAddTreatment() {
    if (this.addDisease) {
      this.store.dispatch(AddNewDiseaseAction({
        diseaseName: this.addEditTreatmentForm.get('inputCondition')?.value,
        treatmentItems: this.treatments
      }))
    } else {
      this.store.dispatch(AddNewTreatmentAction({
        diseaseId: this.diseaseId,
        treatmentItems: this.treatments
      }));
    }

    this.closeModal();
  }

  onTreatmentItemType() {
    this.showItemDropdown = true;
    let value: string = this.addEditTreatmentForm.get('inputTreatmentDescription')?.value;
    if (value !== "") {
      this.itemTypeEventEmitter.emit(value)
    }
  }

  onItemClick(option: string) {
    this.showItemDropdown = false;
    this.addEditTreatmentForm.get('inputTreatmentDescription')?.setValue(option)
  }


  ngOnDestroy(): void {
    if (this.itemTypeSubscription) {
      this.itemTypeSubscription.unsubscribe();
    }
    if (this.treatmentItemsSubscription) {
      this.treatmentItemsSubscription.unsubscribe();
    }
  }

  getControl(controlName: string) {
    return this.addEditTreatmentForm.get(controlName)
  }
}
