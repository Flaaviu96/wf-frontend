import { Taskmetadata } from "./task.metadata.model";

export interface Task {
    id : number,
    taskName : string,
    state : string, 
    comments ?: Comment[],
    taskMetadata ?: Taskmetadata
}