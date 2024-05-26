import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private _userservices: UserService, private router: Router) {
    this.state();
  }
  ngOnInit(): void {}
  state() {
    this._userservices.getUserState().subscribe({
      next: (state) => {
        this.isLoggedIn = state;
      },
    });
  }
  changeState() {
    console.log('from changestate');

    if (this.isLoggedIn) {
      console.log('yes');

      this._userservices.logout();
    } else {
      console.log('no');

      this.router.navigate(['signin']);
    }
  }
}
