import {Component} from '@angular/core';
import {NgForOf, NgStyle} from "@angular/common";
import {MedicalNote} from "../../../model/notes";

@Component({
  selector: 'app-medical-note',
  standalone: true,
  imports: [
    NgStyle,
    NgForOf
  ],
  templateUrl: './medical-note.component.html',
  styleUrl: './medical-note.component.css'
})
export class MedicalNoteComponent {
  isOpen = false;
  notes: MedicalNote[] = [];
  newNote = "";

  selectedNote: MedicalNote | null = null;

  addNote(): void {
    if (this.newNote.trim()) {
      this.notes.push({
        id: Date.now(),
        text: this.newNote,
        date: new Date().toLocaleDateString(),
      });
      this.newNote = "";
    }
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.selectedNote = null;
  }
}
