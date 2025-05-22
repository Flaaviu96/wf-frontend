import { Task } from "./task.model";

export interface Project {
    id : number,
    projectName : string,
    projectDescription : string,
    tasks?: Task[], 
    workflowId : number,
}