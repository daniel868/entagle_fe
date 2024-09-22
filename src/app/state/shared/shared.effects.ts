import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Component, inject, Injectable, TemplateRef, ViewChild} from "@angular/core";
import {GenericFailedAction, GenericSuccessAction} from "./shared.actions";
import {tap} from "rxjs";
import {BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {GenericSuccessModalComponent} from "../../shared/modals/generic-success-modal/generic-success-modal.component";
import {GenericFailedModalComponent} from "../../shared/modals/generic-failed-modal/generic-failed-modal.component";


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
        const initialState = {
          message: action.message // Pass this to the modal
        };
        const modalOptions: ModalOptions = {
          initialState: initialState,
          backdrop: true,  // Enables backdrop click to close the modal
          keyboard: true,  // Close the modal when pressing escape
        };


        this.modalService.show(GenericSuccessModalComponent, modalOptions);
      })
    ), {dispatch: false})


  genericFailedActionEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(GenericFailedAction),
      tap((action) => {
        const initialState = {
          errorMessage: action.message // Pass this to the modal
        };
        const modalOptions: ModalOptions = {
          initialState: initialState,
          backdrop: true,  // Enables backdrop click to close the modal
          keyboard: true,  // Close the modal when pressing escape
      };

        this.modalService.show(GenericFailedModalComponent, modalOptions)
      })
    ), {dispatch: false})

}
