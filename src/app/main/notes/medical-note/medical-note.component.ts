import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgStyle} from "@angular/common";
import {MedicalNote} from "../../../model/notes";
import {FormsModule} from "@angular/forms";
import {AppState} from "../../../state/app.reducer";
import {Store} from "@ngrx/store";
import {AddNewMedicalNoteAction, FetchMedicalNotesAction} from "../../../state/medical/medical.action";
import {map} from "rxjs";

@Component({
  selector: 'app-medical-note',
  standalone: true,
  imports: [
    NgStyle,
    NgForOf,
    FormsModule,
    DatePipe
  ],
  templateUrl: './medical-note.component.html',
  styleUrl: './medical-note.component.css'
})
export class MedicalNoteComponent implements OnInit {
  isOpen = false;
  notes: MedicalNote[] = [];
  newNote: string = "";
  diseaseId: number;

  selectedNote: MedicalNote | null = null;

  @Input()
  openCloseModalEventEmitter: EventEmitter<number>;

  constructor(private store: Store<AppState>) {
  }


  ngOnInit(): void {
    this.openCloseModalEventEmitter.subscribe(newValue => {
      this.isOpen = true
      this.diseaseId = newValue;
      this.store.dispatch(FetchMedicalNotesAction({diseaseId: newValue}))
    });

    this.store.select('medical')
      .pipe(
        map(medicalNotesState => medicalNotesState.medicalNotes)
      ).subscribe(notes => {
      if (!!notes) {
        console.log(JSON.stringify(notes))
        this.notes = notes
      }
    })
  }

  addNote(): void {
    if (!!this.diseaseId) {
      let newNote: MedicalNote = {
        id: null,
        noteContent: this.newNote,
        createdDate: new Date(),
        createdBy:''
      }
      this.store.dispatch(AddNewMedicalNoteAction({diseaseId: this.diseaseId, note: newNote}))
      this.newNote = "";
    }
  }

  deleteNote(id: number | null): void {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.selectedNote = null;
  }
}
