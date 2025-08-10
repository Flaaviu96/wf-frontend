
export interface TaskFilter {
    taskName ?: string,
    state ?: string,
    createdDateFrom ?: Date,
    createdDateTo ?: Date,
    assignedTo ?: string
    cursorTaskId?: number,
    nextPage?: boolean
    firstSearch?: boolean
}