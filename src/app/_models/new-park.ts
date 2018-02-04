export interface INewPark {
  name: string;
  description: string;
  latitude: number,
  longitude: number,
  year_built: string,
  category_ids: string[];
  equipment_ids: string[];
}
