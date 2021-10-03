import VacationModel from "../Models/VacationModel";
// vacations State - המידע ברמת האפליקציה הקשור למוצרים
export class VacationsState {
    public vacations: VacationModel[] = []; // undefined חשוב לאתחל מערכים כך שלא יהיה בו
}

// vacations Action Type: 
export enum VacationsActionType {
    VacationsDownloaded = "VacationsDownloaded",
    VacationAdded = "VacationAdded",
    VacationUpdated = "VacationUpdated",
    VacationDeleted = "VacationDeleted"
}

// vacations Action:
export interface VacationsAction {
    type: VacationsActionType;
    payload?: any; // מטען שילוח
}

// vacations Action Creators: 
export function vacationsDownloadedAction(vacations: VacationModel[]): VacationsAction {
    return { type: VacationsActionType.VacationsDownloaded, payload: vacations };
}
export function vacationAddedAction(addedVacation: VacationModel): VacationsAction {
    return { type: VacationsActionType.VacationAdded, payload: addedVacation };
}
export function vacationUpdatedAction(updatedVacation:  VacationModel): VacationsAction {
    return { type: VacationsActionType.VacationUpdated, payload: updatedVacation };
}
export function vacationDeletedAction(id: number): VacationsAction {
    return { type: VacationsActionType.VacationDeleted, payload: id };
}

// vacations Reducer: 
export function vacationReducer (currentState: VacationsState = new VacationsState(), action: VacationsAction): VacationsState {

    const newState = { ...currentState };

    switch (action.type) {

        case VacationsActionType.VacationsDownloaded: // payload = all vacations
            newState.vacations = action.payload;
            break;

        case VacationsActionType.VacationAdded: // payload = added vacation
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.VacationUpdated: // payload = updated vacation
            const indexToUpdate = newState.vacations.findIndex(p => p.id === action.payload.id);
            newState.vacations[indexToUpdate] = action.payload;
            break;

        case VacationsActionType.VacationDeleted: // payload = vacations id to delete
            const indexToDelete = newState.vacations.findIndex(p => p.id === action.payload);
            newState.vacations.splice(indexToDelete, 1);
            break;
    }

    return newState;

}