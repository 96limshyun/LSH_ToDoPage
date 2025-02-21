export interface DND_Result {
    draggableId: string;
    type: string;
    source: {
        index: number;
        droppableId: string;
    };
    destination: {
        index: number;
        droppableId: string;
    } | null;
}