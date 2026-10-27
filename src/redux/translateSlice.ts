import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

// Types
type TranslateResponse = {
  responseData?: {translatedText: string};
};
type InitialState = {
  loading: boolean;
  data: TranslateResponse;
  error: string;
};
type FetchTranslateParams = {
  text: "" | string;
  from: string;
  to: string;
};

const initialState: InitialState = {
  loading: false,
  data: {},
  error: ""
}

export const fetchTranslate = createAsyncThunk("translate/fetchTranslate", async ({ text, from, to }: FetchTranslateParams): Promise<TranslateResponse> => {
  const res = await axios.get("https://api.mymemory.translated.net/get", {
    params: {q: text, langpair: `${from}|${to}`}
  })
  return res.data
})

const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTranslate.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTranslate.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchTranslate.rejected, (state, action) => {
        state.loading = false
        state.data = {}
        state.error = action.error.message ?? ""
      })
  }
})

export default translateSlice.reducer