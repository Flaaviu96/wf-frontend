import { Subject } from "rxjs";
import { EventStream } from "./event-stream";

export abstract class AbstractStreamService<T extends any[], R extends any[]> {
    inputStream = new EventStream<T>();
    outputStream = new EventStream<R>();


    destryoStreams() : void {
        this.inputStream.complete();
        this.outputStream.complete();
    }
}