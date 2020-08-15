import { Injectable } from "@angular/core";
import { Place } from "./place.model";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      "p1",
      "Manhattan Mansion",
      "In the hear of New York City. ",
      "https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg",
      149.99
    ),
    new Place(
      "p2",
      "L'Amour Toujours",
      "A romantic Place in Paris! ",
      "https://aeroaffaires.fr/wp-content/uploads/2018/08/imperiale_palace_hotel_1_large_croped-890x400.jpg",
      189.99
    ),
    new Place(
      "p3",
      "The Foggy Palace",
      "Not your average city trip! ",
      "https://i.ytimg.com/vi/TgiPVCUhwNs/maxresdefault.jpg",
      99.99
    ),
  ];
  get places() {
    return [...this._places];
  }
  getPlace(id: string) {
    return { ...this._places.find((p) => p.id === id) };
  }
  constructor() {}
}
