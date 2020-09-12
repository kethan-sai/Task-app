import { DataserviceService } from './../../services/dataservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  // structure of a message and a variable to check if published or not

  message = {
    text: '',
    published: false,
  };

  // variable for submittion check
  submitted = false;

  constructor(private dss: DataserviceService) {}

  ngOnInit(): void {
    console.log('initialized ' + this.message.text);
  }

  // function to save present data using service elements
  saveMessage() {
    const data = {
      text: this.message.text,
    };

    this.dss.create(data).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // function to craete new/empty object
  newMessage() {
    this.submitted = false;
    this.message = {
      text: '',
      published: false,
    };
  }
}
