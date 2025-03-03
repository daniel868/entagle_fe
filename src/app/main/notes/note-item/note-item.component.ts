import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [],
  templateUrl: './note-item.component.html',
  styleUrl: './note-item.component.css'
})
export class NoteItemComponent {
  @Input() note: MedicalNote;
  @Output() onDelete = new EventEmitter<number>();
}
