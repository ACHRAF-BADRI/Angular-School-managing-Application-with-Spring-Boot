import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http"; 
import { Cour } from "./cours";
import { Cour2 } from "./cour2";

@Injectable({
    providedIn: 'root'
})

export class CourService {
    private apiServerUrl = 'http://localhost:8081';

    constructor(private http: HttpClient) { }

    public getCours(): Observable<Cour[]> {
        return this.http.get<Cour[]>(`${this.apiServerUrl}/api/cours/all`);
    }

    public getCours2(): Observable<Cour2[]> {
        return this.http.get<Cour2[]>(`${this.apiServerUrl}/api/cours/all`);
    }

    public getCoursByName(name: string): Observable<void> {
        return this.http.get<void>(`${this.apiServerUrl}/api/cours/onecours/find/${name}`);
    }

    public addCours(cour: Cour): Observable<Cour> {
        return this.http.post<Cour>(`${this.apiServerUrl}/api/cours/add`, cour);
    }

    public addCours2(cour: Cour2): Observable<Cour2> {
        return this.http.post<Cour2>(`${this.apiServerUrl}/api/cours/add`, cour);
    }

    public updateCours(cour: Cour): Observable<Cour> {
        return this.http.put<Cour>(`${this.apiServerUrl}/api/cours/update`, cour);
    }

    public deleteCours(courId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/cours/delete/${courId}`);
    }
    
}
