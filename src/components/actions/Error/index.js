import {v4 as uuidv4} from 'uuid';
import {ADD_ERROR,REMOVE_ERROR} from '../Type';
export const SetError=(msg)=>async dispatch=>{
         const id=uuidv4();
         dispatch({
             type:ADD_ERROR,
             payload:{msg,id}
         })
         setTimeout(()=>{
            dispatch({
                type:REMOVE_ERROR,
                payload:id
            })
         },5000)
}