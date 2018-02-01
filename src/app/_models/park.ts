export interface IPark {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  coordinates: [number, number];
  year_built: number;
  rating: number;
  pictures: [
    {
      preview: string,
      large: string,
      retina: string
    }
    ];
  equipment: [
    {
      id: string,
      name: string,
      picture: string
    }
    ];
  number_of_reports: number;
}
