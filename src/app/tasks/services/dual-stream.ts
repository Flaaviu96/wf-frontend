import { EventStream } from "./event-stream";

export class DualStream<T extends any[]> {
    private intentSubject = new EventStream<T>();
    private listenSubject = new EventStream<T>();

    getIntent() {
        return this.intentSubject;
    }

    getListen() {
        return this.listenSubject;
    }
}