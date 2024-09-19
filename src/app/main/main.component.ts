import {Component, EventEmitter, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AppState} from "../state/app.reducer";
import {Store} from "@ngrx/store";
import {Subscription, tap} from "rxjs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FetchUserInfoAction} from "../state/userInfo/userInfo.actions";
import {NgForOf} from "@angular/common";
import {ChangeUsernameModalComponent} from "../shared/modals/change-username-modal/change-username-modal.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    ChangeUsernameModalComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit, OnDestroy {

  username: string;
  email: string;
  userSubscription: Subscription;

  qualification: string[];
  competences: string[];

  currentModal: BsModalRef;


  @ViewChild('changeUsernameTemplate')
  changeUsernameTemplate: TemplateRef<any>;

  constructor(private store: Store<AppState>,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.store.dispatch(FetchUserInfoAction());

    this.userSubscription = this.store.select('auth')
      .subscribe(response => {
        if (!!response.user) {
          this.username = response.user;
        }
        if (!!response.email) {
          this.email = response.email;
        }
      });

    this.store.select('userInfo')
      .pipe()
      .subscribe((userInfo) => {
        if (!!userInfo.competences) {
          this.competences = userInfo.competences;
        }
        if (!!userInfo.qualification) {
          this.qualification = userInfo.qualification;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }


  openUsernameModal() {
    this.currentModal = this.modalService.show(this.changeUsernameTemplate);
  }

  onModalClose(event: boolean) {
    if (this.currentModal) {
      this.currentModal.hide();
    }
  }
}
