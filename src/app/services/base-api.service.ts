import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class BaseAPIService {

    private baseUrl;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.baseUrl;
    }

    getEntities(entityName: string): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl + entityName)
    }

    createEntity(entityName: string, result: object): Observable<any[]> {
        return this.http.post<any[]>(this.baseUrl + entityName, result)
    }

    updateEntity(url: string, data: any): Observable<any[]> {
        return this.http.put<any[]>(this.baseUrl + url, data);
    }
}