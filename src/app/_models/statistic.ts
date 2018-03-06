export interface IStatistic {
  locations: [
    {
      latitude: number;
      longitude: number;
    }
  ];
  average_duration: number;
  views: {
    'Account settings': number;
    'Equipment (menu)': number;
    'Equipment (park)': number;
    'Log out': number;
    'Maps view': number;
    'My parks': number;
    'Park view': number;
    'Rating': number;
    'Register new park': number;
    'Report a park': number;
    'Suggest edit': number;
    'Top parks': number;
  };
  platforms: {
    'Android': number;
    'iOS': number;
  };
}
