import { Component, OnInit, ViewChild} from '@angular/core';
import { IUser, ISetting } from '../_models/index';
import { UserService, ImportExportService } from '../_services/index';
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
  display: boolean;
  win: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService,
              private exportService: ImportExportService
  ) {}

  ngOnInit() {
    this.getAllUsers();
    this.getSettings();
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id)
      .subscribe(() => { this.getAllUsers(); });
  }

  getSettings() {
    this.userService.getSettings()
      .subscribe(settings => {
        this.display = settings.display_weight_height;
      });
  }

  updateSettings($event) {
    this.userService.updateSettings($event.checked)
      .subscribe(() => { this.getSettings(); });
  }

  export() {
    this.win = window.open('', '_blank');
    this.exportService.getUsersExport()
      .subscribe(blob => {
        const downloadUrl = URL.createObjectURL(blob);
        this.win.document.location = downloadUrl;
      });
  }


  getAllUsers() {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}

