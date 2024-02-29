import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http"; 
import { Progress } from "./progress";

@Injectable({
    providedIn: 'root'
})

export class ProgressService {
    private apiServerUrl = 'http://localhost:8082';

    constructor(private http: HttpClient) { }

    public getProgress(): Observable<Progress[]> {
        return this.http.get<Progress[]>(`${this.apiServerUrl}/api/progress/all`);
    }

    public addProgress(progress: Progress): Observable<Progress> {
        return this.http.post<Progress>(`${this.apiServerUrl}/api/progress/add`, progress);
    }

    public updateProgress(progress: Progress): Observable<Progress> {
        return this.http.put<Progress>(`${this.apiServerUrl}/api/progress/update`, progress);
    }

    public deleteProgress(progressId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/progress/delete/${progressId}`);
    }
    
}
