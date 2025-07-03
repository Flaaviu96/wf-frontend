import { Subject } from "rxjs";

export class EventStream<T> {
  private subject = new Subject<T>();

  get listener() {
    return this.subject.asObservable();
  }

  add(item: T) {
    this.subject.next(item);
  }
}
