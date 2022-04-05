import { Injectable } from "@angular/core";
import { 
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEventType
} from "@angular/common/http";
import { filter, Observable, tap } from "rxjs";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedReq = req.clone({
            withCredentials: true
        });

        return next.handle(modifiedReq)
            // .pipe(
            //     filter(response => response.type === HttpEventType.Response),
            //     tap(response => {
            //         console.log(response);
            //     })
            // );
    }

}
