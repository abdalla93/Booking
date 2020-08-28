import { Injectable } from "@angular/core";
import { Booking } from "./booking.model";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { take, tap, delay, switchMap, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

interface bookingData {
  placeId: string;
  userId: string;
  placeTitle: string;
  placeImage: string;
  firstName: string;
  lastName: string;
  guestNumber: number;
  dateFrom: Date;
  dateTo: Date;
}
@Injectable({ providedIn: "root" })
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([]);

  get bookings() {
    return this._bookings.asObservable();
  }
  constructor(private authService: AuthService, private http: HttpClient) {}

  fetchBookings() {
    return this.http
      .get<{ [key: string]: bookingData }>(
        `https://ionic-angular-42958.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${this.authService.userId}"`
      )
      .pipe(
        map((resData) => {
          const bookings = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              bookings.push(
                new Booking(
                  key,
                  resData[key].placeId,
                  resData[key].userId,
                  resData[key].placeTitle,
                  resData[key].placeImage,
                  resData[key].firstName,
                  resData[key].lastName,
                  resData[key].guestNumber,
                  new Date(resData[key].dateFrom),
                  new Date(resData[key].dateTo)
                )
              );
            }
          }
          return bookings;
          // return [];
        }),
        tap((booking) => {
          this._bookings.next(booking);
        })
      );
  }
  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    let generatedId: string;
    const newBooking = new Booking(
      Math.random().toString(),
      placeId,
      this.authService.userId,
      placeTitle,
      placeImage,
      firstName,
      lastName,
      guestNumber,
      dateFrom,
      dateTo
    );

    return this.http
      .post<{ name: string }>(
        "https://ionic-angular-42958.firebaseio.com/bookings.json",
        {
          ...newBooking,
          id: null,
        }
      )
      .pipe(
        switchMap((resData) => {
          generatedId = resData.name;
          return this.bookings;
        }),
        take(1),
        tap((bookings) => {
          newBooking.id = generatedId;
          this._bookings.next(bookings.concat(newBooking));
        })
      );
  }
  cancelBooking(bookingId: string) {
    return this.http
      .delete(
        `https://ionic-angular-42958.firebaseio.com/bookings/${bookingId}.json`
      )
      .pipe(
        switchMap(() => {
          return this.bookings;
        }),
        take(1),
        tap((bookings) => {
          this._bookings.next(
            bookings.filter((b) => {
              return b.id !== bookingId;
            })
          );
        })
      );
  }
}
