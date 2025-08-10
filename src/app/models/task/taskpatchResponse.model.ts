import { Taskmetadata } from "./task.metadata.model";

export interface TaskPatchResponse {
    taskName?: string,
    state?: string,
    modifiedDate?: Date,
    taskMetadataDTO?: Partial<Taskmetadata>;
}