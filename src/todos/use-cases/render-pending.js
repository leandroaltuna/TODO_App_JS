import todoStore, { Filters } from "../../store/todo.store";

let element;
/**
 * 
 * @param { Stirng } elementId 
 */
export const renderPending = ( elementId ) => {
    
    if ( !element ) {
    
        element = document.querySelector( elementId );

        if ( !element ) throw new Error( `Element ${ elementId } not found` );

    }

    element.innerHTML = todoStore.getTodos( Filters.Pending ).length;

}