import { Taskmetadata } from "./task.metadata.model";
import { Comment as AppComment } from "./comment.model";
import { TaskTimeTracking } from "./taskTimeTracking.model";
import { PermissionType } from "./permission-type.model";
import { Attachment } from "./attachment.model";

export interface Task {
    id : number,
    taskName : string,
    state : string, 
    commentDTOS ?: AppComment[],
    attachmentDTOS ?: Attachment[], 
    permissionTypes: PermissionType[];
    taskMetadataDTO ?: Taskmetadata,
    taskTimeTrackingDTO ?: TaskTimeTracking,
    createdDate : Date,
    modifiedDate : Date,
}