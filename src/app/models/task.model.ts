import { Taskmetadata } from "./task.metadata.model";
import { Comment as AppComment } from "./comment.model";
import { TaskTimeTracking } from "./taskTimeTracking.model";
import { PermissionType } from "./permission-type.model";

export interface Task {
    id : number,
    taskName : string,
    state : string, 
    commentDTOS ?: AppComment[],
    permissionTypes: PermissionType[];
    taskMetadataDTO ?: Taskmetadata,
    taskTimeTrackingDTO ?: TaskTimeTracking
}