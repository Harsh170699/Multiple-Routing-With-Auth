import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {

  // $ - it indicates that this variable is observable
  contacts$: any;  
  users: any;
  userStatus: any;
  listUsers$: any;
  userDetails: any;
  userMsg: any;

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    // Example 1: 1st Way of creating Observable
    this.users = ['harsh', 'ujas', 'vandan', 'aneri'];

    // we will create observable using this array
    this.contacts$ = of(this.users);
    console.log(this.contacts$);

    // Example 2: 2nd way of creating observable 
    new Observable(observer => {
      // this observer will send the value (in progress) after 2 sec 
      setTimeout(() => {
        observer.next('In Progress')
      }, 2000);

      setTimeout(() => {
        observer.next('Pending')
      }, 4000);

      setTimeout(() => {
        observer.next('Completed')
      }, 6000);

    }).subscribe(data => {
      this.userStatus = data;
    }, error => {
      console.log(error);
    });

    // Example 3: Observable and subscribe with Http
    this.contactsService.getUsers().subscribe(data => {
      this.listUsers$ = data;
    }, error => {
      console.log(error);
    });

    // Example 4: toPromise()
    // get the data once and stop, the Promise is resolved
    this.contactsService.viewUser().toPromise()
    .then(response => {
      this.userDetails = response;
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      this.userMsg = "User details loaded";
    })
  }
}
