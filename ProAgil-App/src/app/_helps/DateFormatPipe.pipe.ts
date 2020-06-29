import { Pipe, PipeTransform, LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Constants } from '../util/Constants';
import * as moment from 'moment';

@Pipe({
  name: 'DateTimeFormatPipe',
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {

    let date: any;

    try {
        date =  moment(value, 'DD/MM/YYYY HH:mm:ss', 'pt', true);
    } catch (error) {
        date =  moment(value, 'MM/DD/YYYY HH:mm:ss', 'pt', true);
    }
    return super.transform(date, Constants.DATE_TIME_FMT);
  }
}
