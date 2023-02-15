import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/reducer";
import tasksReducer from "../reducers/tasksReducer";

const store = createStore(tasksReducer, applyMiddleware(thunk));

export default store;
