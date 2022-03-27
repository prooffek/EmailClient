import { Injectable } from "@angular/core";
import { AsyncValidator, FormControl, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map,catchError } from "rxjs/operators";
import { AuthService } from "../auth.service";

@Injectable({ providedIn: 'root'})
export class UniqueUsername implements AsyncValidator{
    validate = (control: FormControl): Observable<ValidationErrors> => {
        const { value } = control;

        return this.service.usernameAvailable(value)
            .pipe(
                map(() => null), //nie ma konieczności sprawdzania value, poniewaz do pipe'a wejdzie tylko,jeśli api nie wyrzuci błędu
                catchError(err => {
                    console.log(err);
        
                    if (err.error.username)
                        return of({ nonUniqueUsername: true }); //of() tworzy nowy Observable, który emituje obiekt podany jako argument
                    
                    return of ({ error: err.message });
                })
            );       
        }

    constructor(private service: AuthService) {}
}
