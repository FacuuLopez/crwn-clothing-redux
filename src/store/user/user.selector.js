import { createSelector } from "reselect";

const selectUserReducer = (state) => state.user;

export const selectCurrentUser = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.currentUser
);

export const selectIsUserOpen = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.isUserOpen
);