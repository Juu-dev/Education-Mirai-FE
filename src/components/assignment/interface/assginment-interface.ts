export interface AssignmentInterface {
    title: string;
    description: string;
    id: number;
    dueDate: string;
    isCompleted: boolean;
    tags: string[];
    time: string;
}

export interface AssignmentDetails {
    title: string;
    description: string;
    dueDate: string;
    studentGroup: string[];
}
