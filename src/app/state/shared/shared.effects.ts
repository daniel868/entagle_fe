import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Component, inject, Injectable, TemplateRef, ViewChild} from "@angular/core";
import {GenericSuccessAction} from "./shared.actions";
import {tap} from "rxjs";
import {BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {ChangeUsernameModalComponent} from "../../shared/modals/change-username-modal/change-username-modal.component";
import {GenericSuccessModalComponent} from "../../shared/modals/generic-success-modal/generic-success-modal.component";


@Injectable({
  providedIn: 'root'
})
export class SharedEffects {
  private actions$ = inject(Actions);


  constructor(private modalService: BsModalService) {

  }

  genericSuccessActionEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(GenericSuccessAction),
      tap((action) => {
        console.log("Success modal showed");
        const initialState = {
          message: 'generic success message' // Pass this to the modal
        };
        const modalOptions: ModalOptions = {
          initialState: initialState,
          backdrop: true,  // Enables backdrop click to close the modal
          keyboard: true,  // Close the modal when pressing escape
        };


        this.modalService.show(GenericSuccessModalComponent, modalOptions);
      })
    ), {dispatch: false})
}
