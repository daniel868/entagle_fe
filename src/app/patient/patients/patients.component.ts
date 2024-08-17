import {Component, OnInit} from '@angular/core';
import {PatientRowComponent} from "../patient-row/patient-row.component";
import {Mocks} from "../../mocks/Mocks";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    PatientRowComponent,
    NgForOf
  ],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent implements OnInit {


  ngOnInit(): void {

  }


  protected readonly Mocks = Mocks;
}
