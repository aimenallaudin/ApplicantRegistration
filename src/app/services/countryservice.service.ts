import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Country } from "../country";
import { map } from "rxjs";
@Injectable({
    providedIn:'root'
})
export class CountryService{

    //apiBaseUrl='https://api.countrylayer.com/v2/';
    constructor(private httpclient: HttpClient){}
    httpOptions={
        headers: new HttpHeaders( {
        'Content-type':'application/json',
        'access_key' : 'YOUR_ACCESS_KEY'
        
    })
}
getCountry(): Observable<Country[]>{
    return this.httpclient.get<Country[]>('https://restcountries.com/v3.1/all',{
        headers: this.httpOptions.headers})
    }
    
    // getCountries(): Observable<Country[]>{
    //     return this.httpclient.get<Country[]>('{https://restcountries.com/v3.1/all}')
    // }
    // getCountry(){
    //     this.httpclient.get('https://restcountries.com/v3.1/all');
    // }



}