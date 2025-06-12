import { State } from "./state";

export interface WorkflowDTO {
  projectId: number;
  stateDTOListMap: {
    [stateFrom: string]: State[];
  };
}
