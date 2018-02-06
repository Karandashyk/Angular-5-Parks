import { Component, OnInit, ViewChild} from '@angular/core';
import { IUser } from '../_models/index';
import { UserService } from '../_services/index';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  moduleId: module.id,
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss']

})

export class UsersComponent implements OnInit {
  users: IUser[] = [];
  displayedColumns = ['full_name', 'gender', 'age', 'email', 'delete'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(() => { this.loadAllUsers(); });
  }

  private loadAllUsers() {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}
