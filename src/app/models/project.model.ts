import { Task } from "./task.model";

export interface Project {
    id : number,
    projectKey : string,
    projectName : string,
    projectDescription : string,
    tasks?: Task[], 
    workflowId : number,
}