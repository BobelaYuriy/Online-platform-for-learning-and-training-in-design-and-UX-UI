import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: [],
    isLoading: false,
    error: '',
    text: '',
    count: 0
}

export const testReducer = createSlice({
    name: 'test',
    initialState,
    reducers: {
        increment(state, action) {
            state.count += action.payload
        }
    }
})

export default testReducer.reducer;