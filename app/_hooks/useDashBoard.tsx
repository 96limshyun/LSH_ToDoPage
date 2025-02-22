import { useEffect, useState } from "react";
import { DashboardWithTask } from "../_types/dashboardType";
import { DND_Result } from "../_types/dndType";
import { updateDashBoardPosition, updateTaskPosition } from "../lib/dndAction";

interface UseDashboardDragProps {
    initialDashboards: DashboardWithTask[];
}

export default function useDashBoard({initialDashboards}: UseDashboardDragProps) {
    const [localDashboards, setLocalDashboards] = useState<DashboardWithTask[]>(initialDashboards);

    const handleDashboardDrag = async (result: DND_Result) => {
        const { source, destination } = result;
        if (!destination) return;

        const updatedDashboards = [...localDashboards];
        const [moved] = updatedDashboards.splice(source.index, 1);
        updatedDashboards.splice(destination.index, 0, moved);
        setLocalDashboards(updatedDashboards);

        await updateDashBoardPosition(updatedDashboards);
    };

    const handleTaskDrag = async (result: DND_Result) => {
        const { source, destination } = result;
        if (!destination) return;

        const updatedDashboards = [...localDashboards];
        const fromDashboardId = source.droppableId;
        const toDashboardId = destination.droppableId;
        const fromIndex = source.index
        const toIndex = destination.index;

        const fromDashBoard = updatedDashboards.find(board => board.id === fromDashboardId)
        const toDashBoard = updatedDashboards.find(board => board.id === toDashboardId)

        if(!fromDashBoard || !toDashBoard) return;

        const [selectedTask] = fromDashBoard.tasks.splice(fromIndex, 1)

        if(fromDashboardId === toDashboardId) {
            fromDashBoard.tasks.splice(toIndex, 0, selectedTask)
        } else {
            selectedTask.dashboard_id = toDashboardId;
            toDashBoard.tasks.splice(toIndex, 0, selectedTask)
        }

        await updateTaskPosition(fromDashboardId, toDashboardId, fromDashBoard.tasks, toDashBoard.tasks);
    };

    const dragHandleMap: Record<string, (result: DND_Result) => Promise<void>> = {
        DASHBOARD: handleDashboardDrag,
        TASK: handleTaskDrag,
    };

    const handleDragEnd = async (result: DND_Result) => {
        if(!result.destination) return;
        await dragHandleMap[result.type]?.(result)
    }

    useEffect(() => {
        setLocalDashboards(initialDashboards)
    }, [initialDashboards])

    return {localDashboards, handleDragEnd}
}