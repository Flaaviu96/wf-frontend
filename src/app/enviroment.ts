export const enviroment = {
    apiAuthenticateUrl: 'http://localhost:8080/login', 
    apiProjectUrl: 'http://localhost:8080/projects',
    apiTaskUrl: (projectId: number | string, taskId: number | string) => `http://localhost:8080/projects/${projectId}/tasks/${taskId}`,
    apiCommentUrl: (projectId: number | string, taskId: number | string) => `http://localhost:8080/projects/${projectId}/tasks/${taskId}/comments`,
    apiTaskMetadataUrl: (projectId: number | string, taskId: number | string) => `http://localhost:8080/projects/${projectId}/tasks/${taskId}/metadata`,
    apiProjectPermissionUrl: 'http://localhost:8080/permissions',
    apiUserSearchUrl: 'http://localhost:8080/users',
    apiWorkflowUrl: (projectId: number | string) => `http://localhost:8080/workflows/${projectId}`,
    apiAttachmentsUrl: (projectId: number | string, taskId: number | string) => `http://localhost:8080/projects/${projectId}/tasks/${taskId}/attachments`,
    apiAttachmentUrl: (projectId: number | string, taskId: number | string, attachmentId : number | string) => `http://localhost:8080/projects/${projectId}/tasks/${taskId}/attachments/${attachmentId}`
}