import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: []
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload.messages
        },

    },
});

export const { setMessages } = chatSlice.actions;

export const selectMessages = state => state.chat.messages;

export default chatSlice.reducer;
