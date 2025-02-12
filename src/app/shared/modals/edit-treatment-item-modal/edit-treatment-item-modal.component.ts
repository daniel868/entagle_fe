import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TreatmentItem} from "../../../model/treatment-item";
import {AppState} from "../../../state/app.reducer";
import {Store} from "@ngrx/store";
import {BsModalRef} from "ngx-bootstrap/modal";
import {UpdateTreatmentItemAction} from "../../../state/medical/medical.action";
import {Treatment} from "../../../model/treatment";

@Component({
  selector: 'app-edit-treatment-item-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit-treatment-item-modal.component.html',
  styleUrl: './edit-treatment-item-modal.component.css'
})
export class EditTreatmentItemModalComponent implements OnInit {

  editItemForm: FormGroup;

  @Input()
  editedItem: TreatmentItem;

  @Input()
  items: TreatmentItem[];

  @Input()
  treatmentId: number;

  constructor(private store: Store<AppState>,
              private bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.editItemForm = new FormGroup({
      itemDescription: new FormControl(this.editedItem.description),
    });
  }

  updateItem() {
    let newItemDescription: string = this.editItemForm.get('itemDescription')?.value
    if (this.items) {
      this.items = this.items.map(
        currentItem => {
          if (currentItem.type === this.editedItem.type && currentItem.description !== newItemDescription) {
            let newItem: TreatmentItem = {"type": this.editedItem.type, "description": newItemDescription}
            return newItem
          }
          return currentItem
        }
      )
      this.store.dispatch(UpdateTreatmentItemAction({
        treatmentId: this.treatmentId,
        items: this.items
      }));
    }

    this.closeModal();
  }

  closeModal() {
    if (this.bsModalRef) {
      this.bsModalRef.hide()
    }
  }
}
