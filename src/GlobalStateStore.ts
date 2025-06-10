import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { courseService } from './services/courseService';
import { Dispatch } from '@reduxjs/toolkit';

// Definição do modelo de curso
export interface Course {
    id: string;
    title: string;
    duration?: number;
    category?: string;
    image?: string;
    teacherName?: string;
    teacherDesc?: string;
    enrolled?: boolean;
}

// Definição do estado inicial
export interface CoursesState {
    courses: Course[];
    isLoading: boolean;
}

const initialState: CoursesState = {
    courses: [],
    isLoading: false,
};

// Criando o slice para gerenciamento do estado global
const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setCourses: (state, action: PayloadAction<Course[]>) => {
            state.courses = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setCourses, setLoading } = courseSlice.actions;

// Middleware para buscar cursos do Back4App
export const fetchCourses = () => async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
        const all: Course[] = await courseService.getAllCourses();
        dispatch(setCourses(all));
    } catch (error) {
        console.error("Erro ao buscar cursos:", error);
    } finally {
        dispatch(setLoading(false));
    }
};

// Configuração do Redux Store
const store = configureStore({
    reducer: {
        courses: courseSlice.reducer,
    },
});

// Tipagem do dispatch para uso com Redux
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;