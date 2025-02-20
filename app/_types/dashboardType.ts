export interface TaskType {
    id: number;
    content: string;
    position: number;
    dashboard_id: string;
}

export interface DashboardType {
    id: number;
    name: string;
    position: number;
}
