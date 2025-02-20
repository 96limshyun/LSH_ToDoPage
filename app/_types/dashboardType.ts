export interface Task {
    id: string;
    content: string | null;
    position: number;
    dashboard_id: string;
}

export interface Dashboard {
    id: string;
    name: string;
    position: number;
}

export interface DashboardWithTask extends Dashboard {
    tasks: Task[];
}
