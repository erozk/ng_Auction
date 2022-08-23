import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api/api.service';


@Component({
  selector: 'app-infodialog',
  templateUrl: './infodialog.component.html',
  styleUrls: ['./infodialog.component.css']
})
export class InfodialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string[], private api : ApiService, private dialogRef: MatDialogRef<InfodialogComponent>) { }

  ngOnInit(): void {

  }

}
