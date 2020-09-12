import { DataserviceService } from './../../services/dataservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  messages: any;
  currentMessage = null;
  currentIndex = -1;
  message = '';

  constructor(private dss: DataserviceService) {}

  // retrieve all mesasges at initiation
  ngOnInit(): void {
    this.retrieveMessages();
  }

  // function to recieve all messages
  retrieveMessages() {
    this.dss.getAll().subscribe(
      (data) => {
        this.messages = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // function to refresh messages
  refreshList() {
    this.retrieveMessages();
    this.currentMessage = null;
    this.currentIndex = -1;
  }

  // setter function
  setActiveMessage(message, index) {
    this.currentMessage = message;
    this.currentIndex = index;
  }

  // delete all messages
  removeAllMessages() {
    this.dss.deleteAll().subscribe(
      (response) => {
        console.log(response);
        this.retrieveMessages();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // search function
  searchMessage() {
    this.dss.findInMessage(this.message).subscribe(
      (data) => {
        this.messages = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
