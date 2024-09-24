import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modify-qualification-competences-modal',
  standalone: true,
  imports: [],
  templateUrl: './modify-qualification-competences-modal.component.html',
  styleUrl: './modify-qualification-competences-modal.component.css'
})
export class ModifyQualificationCompetencesModalComponent implements OnInit {

  @Input()
  characteristics: string[];

  @Input()
  characteristicType: CharacteristicType;

  modalTitle: string;

  ngOnInit(): void {
    this.modalTitle = this.characteristicType == CharacteristicType.QUALIFICATION ?
      "Modify user qualification" :
      "Modify user competences";

  }


}

export enum CharacteristicType {
  QUALIFICATION,
  COMPETENCES
}
