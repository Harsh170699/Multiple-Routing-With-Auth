import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faLock = faLock;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      // if user is loggedin then navigate to admin
      this.router.navigate(['admin'])
    }
  }

  onSubmit(): void {
    // console.log(this.loginForm.value);
    // check if form is valid or not
    if (this.loginForm.valid) {
      // if form is valid, then we will submit form value inside login method of auth service, 
      this.auth.login(this.loginForm.value).subscribe(
        // and if it is sucessful, we will navigate to admin page
        (result) => {
          this.router.navigate(['admin'])
        },
        // else we will see alert message
        (err: Error) => {
          alert(err.message);
        }
      )
    }
  }
}
