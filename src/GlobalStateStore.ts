// GlobalStateStore.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { courseService } from './services/courseService';
import { Dispatch } from '@reduxjs/toolkit';

// Estado inicial
const initialState = {
    courses: [],
    isLoading: false,
};

// Slice para gerenciamento de cursos
const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setCourses, setLoading } = courseSlice.actions;

// Middleware para buscar cursos do Back4App
export interface Course {
    // Define the properties of a course according to your data model
    id: string;
    name: string;
    // Add other fields as needed
}

export interface CoursesState {
    courses: Course[];
    isLoading: boolean;
}

export interface SetCoursesAction {
    type: string;
    payload: Course[];
}

export interface SetLoadingAction {
    type: string;
    payload: boolean;
}

export const fetchCourses = () => async (dispatch: Dispatch<SetCoursesAction | SetLoadingAction>) => {
    dispatch(setLoading(true));
    const all: Course[] = await courseService.getAllCourses();
    dispatch(setCourses(all));
    dispatch(setLoading(false));
};

const store = configureStore({
    reducer: {
        courses: courseSlice.reducer,
    },
});

export default store;