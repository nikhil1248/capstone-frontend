import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostRecentFirst'
})
export class MostRecentFirstPipe implements PipeTransform {

  private compare(a, b) {
    const createdOnA = a.message_time;
    const createdOnB = b.message_time;
    let comparison = 1;
    if (createdOnA > createdOnB) {
      comparison = -1;
    }
    return comparison;
  }
  transform(messages: any[]): any[] {
    if (messages && messages.length > 0) {
      return messages.sort(this.compare);
    }
    return null;
  }
}
