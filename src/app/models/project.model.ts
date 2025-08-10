import { Task } from "./task/task.model";

export interface Project {
    projectId : number,
    projectKey : string,
    projectName : string,
    projectDescription : string,
    tasks?: Task[], 
    workflowId : number,
}