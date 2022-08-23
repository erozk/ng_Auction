import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { MatDialogRef } from '@angular/material/dialog'
import { observable, Observable, ObservedValueOf, of, Subject } from 'rxjs';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-auction-dialog',
  templateUrl: './auction-dialog.component.html',
  styleUrls: ['./auction-dialog.component.css']
})
export class AuctionDialogComponent implements OnInit {

  auctionForm !: FormGroup;
  currentFile?: File;
  message = '';
  fileName = 'Select File';
  // fileInfos?: Observable<any>;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<AuctionDialogComponent>) { }

  ngOnInit(): void {
    this.auctionForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  addAuction() {
    if (this.auctionForm.valid) {
       this.upload()
        .subscribe({
          next: () => {
            this.auctionForm.reset();
            this.dialogRef.close('save');
          }, 
          error: () => {
            console.log("auction dialog subscribe error")
          }
        });
    }
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }

  upload(): Observable<any> {
    if (this.currentFile) {
       this.api.fileUpload(this.currentFile,this.auctionForm.value).subscribe(res => {return res});
    }

    return of("");
  }

}


