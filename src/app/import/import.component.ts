import { Component, OnInit } from '@angular/core';
import { ImportExportService } from '../_services/index';


@Component({
  moduleId: module.id,
  templateUrl: 'import.component.html',
  styleUrls: ['import.component.scss']
})

export class ImportComponent implements OnInit {

  constructor(    private importService: ImportExportService,
  ) { }

  ngOnInit() {
    const auth_token = localStorage.getItem('auth_token');

    $('#fileuploader').uploadFile({
      url: 'http://185.57.255.205:8000/admin/import/parks',
      fileName: 'ParksZip',
      headers: { Authorization: auth_token }
    });
  }

}
