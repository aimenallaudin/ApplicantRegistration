import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.css']
})
export class DialogExampleComponent implements OnInit {
form:FormGroup;
action: boolean = false;
  constructor(public dialogRef: MatDialogRef<DialogExampleComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {
    if(data=='reset'){
      this.action=true;
    }
    else
    this.action=false;
   }
  ngOnInit(): void {
  }
  onCancel():void{
    this.dialogRef.close();
  }
  close(){
    this.dialogRef.close();
  }
  delete(){
    this.dialogRef.close(this.form.value);
  }

}
