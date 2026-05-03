import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { act } from "react";

export const getEmployees = createAsyncThunk(
    "employees/getEmployee",
    async(page = 1) => {
        const response = await api.get(`/?page=${page}`);
        return response.data
    }
)

export const getStats = createAsyncThunk(
    "employees/stats",
    async() => {
        const response = await api.get(`/stats/`);
        return response.data
    }
)

const employeesclice = createSlice({
    name : "employees",

    initialState : {
        employees : [],
        stats : {
            mean : 0,
            mode :0,
            median : 0,
            std : 0,
        },
        loading : true,
        error : null,
        count : 0,
        next : null,
        previous : null,
        page : 1,
    },

    reducers : {
        setPage : (state,action) =>{
            state.page = action.payload
        }
    },

    extraReducers : (builder) =>{
        builder

        .addCase(getEmployees.pending , (state) =>{
            state.loading = true;
            state.error = null;
        })

        .addCase(getEmployees.fulfilled , (state,action) => {
            state.employees = action.payload.results;
            state.loading = false,
            state.count = action.payload.count;
            state.previous = action.payload.previous;
            state.next = action.payload.next;
        })

        .addCase(getEmployees.rejected, (state) =>{
            state.error = action.error;
        })

        .addCase(getStats.rejected , (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(getStats.fulfilled , (state,action) => {
            state.stats = action.payload;
        })

    }
})

export const {setPage} = employeesclice.actions;
export default employeesclice.reducer;  