import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return  minutes.toString().padStart(2, '0') + ' mins ' + (value - minutes * 60).toFixed(0).
    toString().padStart(2, '0') + ' sec ';
 }

}

