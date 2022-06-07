import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";
import { BaseAPIService } from "./base-api.service";


@Injectable({
    providedIn: 'root'
})

export class TaskManagementService {

    private entityName = "taskmgmt";
    constructor(private baseApiSerice: BaseAPIService) {

    }

    getTasks(): Observable<any[]> {
        return this.baseApiSerice.getEntities(this.entityName)
            .pipe(
                tap(_ => console.log('fetched tasks')),
                catchError(this.handleError<any[]>('getTasks', []))
            );
    }

    createTask(result: object): Observable<any[]> {
        return this.baseApiSerice.createEntity(this.entityName, result)
            .pipe(
                tap(_ => console.log('create task')),
                catchError(this.handleError<any[]>('createTask', []))
            );
    }

    updateCompletionStatusOfTask(id: Number, data: any): Observable<any[]> {
        return this.baseApiSerice.updateEntity(this.entityName + "/" + id, data)
            .pipe(
                tap(_ => console.log('update task')),
                catchError(this.handleError<any[]>('updateTask', []))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}