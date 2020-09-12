import { DataserviceService } from './../../services/dataservice.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  currentMessage = null;
  message = '';

  constructor(
    private dss: DataserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.getMessage(this.route.snapshot.paramMap.get('id'));
  }

  getMessage(id) {
    this.dss.get(id).subscribe(
      (data) => {
        this.currentMessage = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatePublished(status) {
    const data = {
      message: this.currentMessage.text,
      published: status,
    };

    this.dss.update(this.currentMessage.id, data).subscribe(
      (response) => {
        this.currentMessage.published = status;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateMessage() {
    this.dss.update(this.currentMessage.id, this.currentMessage).subscribe(
      (response) => {
        console.log(response);
        this.message = 'this message was updated succesfully';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteMessage() {
    this.dss.delete(this.currentMessage.id).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
