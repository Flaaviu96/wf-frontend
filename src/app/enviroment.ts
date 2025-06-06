export const enviroment = {
    apiAuthenticateUrl: 'http://localhost:8080/login', 
    apiProjectUrl: 'http://localhost:8080/projects',
    apiTaskUrl: (projectId: number | string, taskId: number | string) => `http://localhost:8080/projects/${projectId}/tasks/${taskId}`,
    apiProjectPermissionUrl: 'http://localhost:8080/permissions',
    apiUserSearchUrl: 'http://localhost:8080/users'
}