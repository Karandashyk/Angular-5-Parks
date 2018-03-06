import { Component, OnInit} from '@angular/core';
import { IStatistic } from '../_models/index';
import { StatisticService } from '../_services/index';
import { MatTableDataSource } from '@angular/material';


@Component({
  moduleId: module.id,
  templateUrl: 'statistics.component.html',
  styleUrls: ['statistics.component.scss']

})

export class StatisticsComponent implements OnInit {

  constructor(
    private statService: StatisticService,
  ) {}
  displayedColumns = ['view', 'popularity'];
  dataSource: any;
  stat: IStatistic = {
    locations: [{
      latitude: 0,
      longitude: 0
    }],
    average_duration: 0,
    platforms: {
      'Android': 0,
      'iOS': 0
    },
    views: {
      'Account settings': 0,
      'Equipment (menu)': 0,
      'Equipment (park)': 0,
      'Log out': 0,
      'Maps view': 0,
      'My parks': 0,
      'Park view': 0,
      'Rating': 0,
      'Register new park': 0,
      'Report a park': 0,
      'Suggest edit': 0,
      'Top parks': 0,
    }
  };
  map;
  heatmap;

  ngOnInit() {
    this.getStatistics();
  }

  getStatistics() {
    this.statService.getStatistics()
      .subscribe(stat => {
        this.stat = stat;
        this.initMap();
        this.dataSource = new MatTableDataSource(parse(stat.views));
      });
  }

  getPoints() {
    return Array.from(this.stat.locations.map(location => {
      return new google.maps.LatLng(location.latitude, location.longitude);
    }));
  }

  initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 59.913192, lng: 10.739964}
    });
    this.heatmap = new google.maps.visualization.HeatmapLayer({
      data: this.getPoints(),
      map: this.map
    });
    this.heatmap.set('radius', 20);

    this.heatmap.set('gradient', gradient);

  }

}

function parse(views) {
  let array = [];
  for (let view in views) {
    array.push({
      view: view,
      popularity: views[view].toFixed(1) + '%'
    });
  }
  return array;
}

const gradient = [
  'rgba(0, 255, 255, 0)',
  'rgba(0, 255, 255, 1)',
  'rgba(0, 191, 255, 1)',
  'rgba(0, 127, 255, 1)',
  'rgba(0, 63, 255, 1)',
  'rgba(0, 0, 255, 1)',
  'rgba(0, 0, 223, 1)',
  'rgba(0, 0, 191, 1)',
  'rgba(0, 0, 159, 1)',
  'rgba(0, 0, 127, 1)',
  'rgba(63, 0, 91, 1)',
  'rgba(127, 0, 63, 1)',
  'rgba(191, 0, 31, 1)',
  'rgba(255, 0, 0, 1)'
];
