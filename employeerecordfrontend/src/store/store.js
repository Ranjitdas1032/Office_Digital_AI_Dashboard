import { configureStore } from "@reduxjs/toolkit";
import employeereducer from "../employeeslice/employeeSlice"

export const store = configureStore({
    reducer : {
        employees : employeereducer
    }
})