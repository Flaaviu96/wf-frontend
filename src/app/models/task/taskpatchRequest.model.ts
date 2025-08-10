import { Taskmetadata } from "./task.metadata.model";
import { TaskTimeTracking } from "./taskTimeTracking.model";

export interface TaskPatchRequest {
  taskName?: string,
  toState?: string,
  fromState?: string, 
  modifiedDate?: Date,  
  taskMetadataDTO?: Partial<Taskmetadata>;
  taskTimeTrackingDTO?: Partial<TaskTimeTracking>;
  userUUID?: string
}
