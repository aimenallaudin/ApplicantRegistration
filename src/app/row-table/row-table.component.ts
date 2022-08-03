import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-row-table',
  templateUrl: './row-table.component.html',
  styleUrls: ['./row-table.component.css']
})
export class RowTableComponent implements OnInit {

  userForm: FormGroup
  constructor(private formbuilder: FormBuilder) {
    this.userForm=this.formbuilder.group({
      
    })
   }

  ngOnInit(): void {
  }

}
