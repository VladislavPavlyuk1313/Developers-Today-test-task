import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CountryCode, PublicHoliday} from "../symbols";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPublicHolidays(year: number, countryCode: CountryCode): Observable<PublicHoliday[]> {
    const url = `${this.apiUrl}/v3/PublicHolidays/${year}/${countryCode}`;
    return this.http.get<PublicHoliday[]>(url);
  }

  //Returns the upcoming public holidays for the next 365 days for the given country
  getNextPublicHolidays(countryCode: CountryCode): Observable<PublicHoliday[]> {
    const url = `${this.apiUrl}/v3/NextPublicHolidays/${countryCode}`;
    return this.http.get<PublicHoliday[]>(url);
  }
}
