import {Component, EventEmitter, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AppState} from "../state/app.reducer";
import {Store} from "@ngrx/store";
import {Subscription, tap} from "rxjs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  FetchProfilePictureAction,
  FetchUserInfoAction,
  UploadProfilePictureAction
} from "../state/userInfo/userInfo.actions";
import {NgForOf} from "@angular/common";
import {ChangeUsernameModalComponent} from "../shared/modals/change-username-modal/change-username-modal.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ChangeEmailModalComponent} from "../shared/modals/change-email-modal/change-email-modal.component";
import {ChangePasswordModalComponent} from "../shared/modals/change-password-modal/change-password-modal.component";

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

  imageBase64: string = 'no_profile_image.png';

  @ViewChild('changeUsernameTemplate')
  changeUsernameTemplate: TemplateRef<any>;

  constructor(private store: Store<AppState>,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.store.dispatch(FetchUserInfoAction());
    this.store.dispatch(FetchProfilePictureAction());

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

    this.store.select('userInfo')
      .pipe()
      .subscribe(response => {
        if (!!response.profileImage) {
          this.imageBase64 = "data:image/jpeg;base64," + response.profileImage
        }
      })
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

  openEmailModal() {
    this.currentModal = this.modalService.show(ChangeEmailModalComponent);
  }

  openPasswordModal() {
    this.currentModal = this.modalService.show(ChangePasswordModalComponent);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0] as File;
    if (file) {
      this.store.dispatch(UploadProfilePictureAction({profileImageFile: file}))
    }
  }
}
