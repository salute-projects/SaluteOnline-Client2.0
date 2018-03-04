import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { FormGroup } from "@angular/forms";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class Helpers {
    formToObject(form: FormGroup, target: any): any {
        for (let key in target) {
            if (target.hasOwnProperty(key)) {
                const control = form.get(key);
                target[key] = control == null ? null : control.value;
            }
        }
        return target;
    }

    toHttpParams(obj: Object): HttpParams {
        let params = new HttpParams();
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const val = obj[key];
                if (val !== undefined && val !== null) {
                    params = params.append(key, val ? val.toString() : val);
                }
            }
        }
        return params;
    }

    capitalizeFirstLetter(value: string) {
        if (!value)
            return "";
        return value[0].toUpperCase() + value.slice(1);
    }
}