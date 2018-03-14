export interface IPark {
  id: string;
  name: string;
  description: string;
  address: string;
  fb_page_id: string;
  city: string;
  coordinates: [number, number];
  year_built: string;
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
  categories: [
    {
      id: string,
      name: string,
    }
    ];
  number_of_reports: number;
  number_of_suggestions: number;
}

export interface INewPark {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  year_built: string;
  category_ids: string[];
  equipment_ids: string[];
}
