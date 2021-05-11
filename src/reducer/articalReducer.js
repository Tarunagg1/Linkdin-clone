import { GET_ARTICALS, SET_LOADING_STATUS } from "../action/action.type";

const initialstate = {
    loading:false,
    articals:[]
}

const articalReducer = (state = initialstate,action)=>{
    switch (action.type) {
        case SET_LOADING_STATUS:
            return {...state,loading:action.status}
        case GET_ARTICALS:
            return {...state,articals:action.payload}
        default:
            return state;
    }
}

export default articalReducer