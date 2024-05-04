import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHours',
  standalone: true,
})
export class MinutesToHours implements PipeTransform {
  transform(minutes: number | undefined): string {
    if (!minutes || minutes < 0) {
      return '0h 0m';
    }

    const hours = Math.floor(minutes / 60);
    const leftMinutes = minutes % 60;

    return `${hours}h ${leftMinutes}m`;
  }
}
