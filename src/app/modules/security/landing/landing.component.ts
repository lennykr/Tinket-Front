import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/shared/models/user';

import { AuthenticationService } from '@app/core/services/authentication.service';
import { UserService } from '@app/core/services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

    const user = this.authenticationService.currentUserValue;

    if(user) {
      let startpage = '/onboarding';

      if(user.isMaker) startpage = '/discover';
      if(user.representsCompany) startpage = '/assignments';
      if(user.isAdmin) startpage = 'mod/users';
      this.router.navigate([ startpage ]);
    }
  }

  ngOnInit() {  }

  Register(){
    this.router.navigate(['register']);
  }

  Login(){
    this.router.navigate(['login']);
  }

}
