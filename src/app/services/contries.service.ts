import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "environments/environment";
import {Observable} from "rxjs";
import {Country, CountryCode, CountryInfo} from "../symbols";

@Injectable()
export class CountriesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getAllCountries (): Observable<Country[]> {
    const url = `${this.apiUrl}/v3/AvailableCountries`;
    return this.http.get<Country[]>(url);
  }

  public getCountryInfo (countryCode: CountryCode): Observable<CountryInfo> {
    const url = `${this.apiUrl}/v3/CountryInfo/${countryCode}`;
    return this.http.get<CountryInfo>(url);
  }
}
