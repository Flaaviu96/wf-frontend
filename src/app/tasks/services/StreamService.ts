import { EventStream } from "./event-stream";

export class StreamService<T extends any[], R extends any[]> {
    inputStream = new EventStream<T>();
    outputStream = new EventStream<R>();


    destryoStreams() : void {
        this.inputStream.complete();
        this.outputStream.complete();
    }
}