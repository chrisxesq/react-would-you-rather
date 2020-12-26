import { RECEIVE_QUESTIONS, UPDATE_QUESTIONS } from '../actions/questions'

export default function questions(state ={}, action){
    switch(action.type){
        case RECEIVE_QUESTIONS:
            return{
                 ...state,
            ...action.questions
            }
        case UPDATE_QUESTIONS:
            return{
                ...state,
                
            }
        default:
            return state
           
    }
}