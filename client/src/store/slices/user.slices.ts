import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { auth } from "../../apis/authApi";

interface InitialState {
    userId: string | null;
    role: "candidate" | "business" | "admin" | null;
    loading: boolean;
    displayName: string | null;
}

const initialState: InitialState = {
    userId: null,
    role: null,
    loading: false,
    displayName: null,
};

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
    const res = await auth.getUser();
    return res;
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setUser(state, action: PayloadAction<{ id: string; role: InitialState["role"]; displayName?: string | null } | null>) {
            if (!action.payload) {
                state.userId = null;
                state.role = null;
                state.displayName = null;
            } else {
                state.userId = action.payload.id;
                state.role = action.payload.role;
                state.displayName = action.payload.displayName ?? state.displayName;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload) {
                state.userId = action.payload.id;
                state.role = action.payload.role;
                state.displayName = action.payload.name || action.payload.fullname || action.payload.email || null;
            }
        });
        builder.addCase(fetchUser.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { setLoading, setUser } = userSlice.actions;