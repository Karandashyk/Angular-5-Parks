import {Component, OnInit} from '@angular/core';
import { IUser } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss']

})

export class UsersComponent implements OnInit {
  users: IUser[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }
}
