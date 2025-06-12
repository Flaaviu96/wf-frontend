import { Taskmetadata } from "./task.metadata.model";
import { Comment as AppComment } from "./comment.model";

export interface Task {
    id : number,
    taskName : string,
    state : string, 
    commentDTOS ?: AppComment[],
    taskMetadataDTO ?: Taskmetadata
}