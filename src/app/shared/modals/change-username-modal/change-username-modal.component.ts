import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppState} from "../../../state/app.reducer";
import {Store} from "@ngrx/store";
import {ChangeUsernameAction} from "../../../state/userInfo/userInfo.actions";

@Component({
  selector: 'app-change-username-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './change-username-modal.component.html',
  styleUrl: './change-username-modal.component.css'
})
export class ChangeUsernameModalComponent implements OnInit {

  usernameForm: FormGroup;

  @Output()
  closeEventEmitter = new EventEmitter<boolean>()

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.usernameForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  changeUsername() {
    const newUsername = this.usernameForm.get('username')?.value;
    this.store.dispatch(ChangeUsernameAction({newUsername: newUsername}));
    this.closeModal();
  }

  closeModal() {
    this.closeEventEmitter.emit(true);
  }

}
