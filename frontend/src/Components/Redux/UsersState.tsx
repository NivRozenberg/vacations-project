import UserModel from "../Models/UserModel";
// users State - המידע ברמת האפליקציה הקשור למוצרים
export class UsersState {
    public users: UserModel[] = []; // undefined חשוב לאתחל מערכים כך שלא יהיה בו
}

// users Action Type: 
export enum UsersActionType {
    UsersDownloaded = "UsersDownloaded",
    UserAdded = "UserAdded",
    UserUpdated = "UserUpdated",
    UserDeleted = "UserDeleted"
}

// users Action:
export interface UsersAction {
    type: UsersActionType;
    payload?: any; // מטען שילוח
}

// users Action Creators: 
export function usersDownloadedAction(users: UserModel[]): UsersAction {
    return { type: UsersActionType.UsersDownloaded, payload: users };
}
export function userAddedAction(addedUser: UserModel): UsersAction {
    return { type: UsersActionType.UserAdded, payload: addedUser };
}
export function userUpdatedAction(updatedUser:  UserModel): UsersAction {
    return { type: UsersActionType.UserUpdated, payload: updatedUser };
}
export function userDeletedAction(id: number): UsersAction {
    return { type: UsersActionType.UserDeleted, payload: id };
}

// users Reducer: 
export function usersReducer (currentState: UsersState = new UsersState(), action: UsersAction): UsersState {

    const newState = { ...currentState };

    switch (action.type) {

        case UsersActionType.UsersDownloaded: // payload = all users
            newState.users = action.payload;
            break;

        case UsersActionType.UserAdded: // payload = added user
            newState.users.push(action.payload);
            break;

        case UsersActionType.UserUpdated: // payload = updated user
            const indexToUpdate = newState.users.findIndex(p => p.id === action.payload.id);
            newState.users[indexToUpdate] = action.payload;
            break;

        case UsersActionType.UserDeleted: // payload = users id to delete
            const indexToDelete = newState.users.findIndex(p => p.id === action.payload);
            newState.users.splice(indexToDelete, 1);
            break;
    }

    return newState;

}