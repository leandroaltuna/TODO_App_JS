import { Todo } from '../todos/models/todo.model';


export const Filters = {

    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',

}


const state = {

    todos: [
        // new Todo( 'Piedra del alma' ),
        // new Todo( 'Piedra del infinito' ),
        // new Todo( 'Piedra del tiempo' ),
        // new Todo( 'Piedra del poder' ),
        // new Todo( 'Piedra del realidad' ),
    ],
    filtros: Filters.All,

}

const initStore = () => {
    
    loadStore();
    console.log( 'InitStore 🥑' );

}

const loadStore = () => {
    
    if ( !localStorage.getItem( 'state' ) ) return;

    const { todos = [], filtros = Filters.All } = JSON.parse( localStorage.getItem( 'state' ) );
    state.todos = todos;
    state.filtros = filtros;

}

const saveStateToLocalStorage = () => {
    localStorage.setItem( 'state', JSON.stringify( state ) );
}

const getTodos = ( filter = Filters.All ) => {
    
    switch ( filter ) {
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter( todo => todo.done );

        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );

        default:
            throw new Error( `Option ${ filter } is not valid.` );
    }

}

/**
 * 
 * @param { String } description 
 */
const addTodo = ( description ) => {
    
    if ( !description ) throw new Error( 'Description is required' );

    state.todos.push( new Todo( description ) );

    saveStateToLocalStorage();
    console.log(state);

}

/**
 * 
 * @param { String } todoId TODO identifier
 */
const toggleTodo = ( todoId ) => {
    
    if ( !todoId ) throw new Error( 'TodoID is required' );

    state.todos = state.todos.map( todo => {

        if ( todo.id === todoId ) {
            todo.done = !todo.done; // Hace la negacion del valor. Es decir, si esta en true lo convierte a false y viceversa.
        }

        return todo;
    });

    saveStateToLocalStorage();

}

/**
 * 
 * @param { String } todoId  TODO identifier
 */
const deleteTodo = ( todoId ) => {

    if ( !todoId ) throw new Error( 'TodoID is required' );

    // Establece un nuevo arreglo
    state.todos = state.todos.filter( todo => todo.id !== todoId );
    console.log(state);

    saveStateToLocalStorage();

}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done );
    saveStateToLocalStorage();
}

/**
 * 
 * @param { Filters } newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {

    // const test = Object.keys( Filters ).includes( newFilter );
    // console.log({ test });
    state.filtros = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filtros;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}