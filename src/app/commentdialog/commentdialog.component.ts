import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-commentdialog',
  templateUrl: './commentdialog.component.html',
  styleUrls: ['./commentdialog.component.css']
})
export class CommentdialogComponent implements OnInit {
  listingId: any
  commentForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<CommentdialogComponent>, @Inject( MAT_DIALOG_DATA ) public data: any ) { }

  ngOnInit(): void {
    this.listingId= this.data.listingId;
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required]
    })
  }

  newComment() {
    if (this.commentForm.valid) {
       this.api.addComment(this.commentForm.value, this.listingId)
        .subscribe({
          next: () => {
            this.commentForm.reset();
            this.dialogRef.close('save comment');
          }, 
          error: () => {
            console.log("comment dialog subscribe error")
          }
        });
    }
  }

}


