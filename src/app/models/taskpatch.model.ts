import { Taskmetadata } from "./task.metadata.model";
import { TaskTimeTracking } from "./taskTimeTracking.model";

export interface TaskPatch {
  taskName?: string,
  toState?: string,
  fromState?: string, 
  modifiedDate?: Date,  
  taskMetadataDTO?: Partial<Taskmetadata>;
  taskTimeTrackingDTO?: Partial<TaskTimeTracking>;
  userUUID?: string
}
