import appHtml from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store.js';
import { renderTodos, renderPending } from './use-cases';

/**
 * 
 * @param { String } elementId 
 */
export const App = ( elementId ) => {

    const ElementIDs = {
        ClearCompletedButton: '.clear-completed',
        TodoList: '.todo-list',
        NewTodoInput: '#new-todo-input',
        TodoFilters: '.filtro',
        PendingCountLabel: '#pending-count',
    }

    const displayTodos = () => {
        
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos );
        updatePendingCount();

    }

    const updatePendingCount = () => {
        renderPending( ElementIDs.PendingCountLabel );
    };


    //Cuando la funcion App() se llame.
    (() => {

        const appElement = document.createElement( 'div' );
        appElement.innerHTML = appHtml;
        document.querySelector( elementId ).append( appElement );

        displayTodos();

    })();

    // Referencias HTML
    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    const todoListUL = document.querySelector( ElementIDs.TodoList );
    const clearCompletedButton = document.querySelector( ElementIDs.ClearCompletedButton );
    const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters );


    // Listeners
    newDescriptionInput.addEventListener( 'keyup', ( event ) => {
        
        if ( event.keyCode !== 13 ) return; // 13 es el keycode de la tecla "enter".
        if ( event.target.value.trim().length === 0 ) return; //Valida si hay algun valor en el input.

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';

    });

    todoListUL.addEventListener( 'click', ( event ) => {

        const elementDataID = event.target.closest( '[data-id]' );
        const todoID = elementDataID.getAttribute( 'data-id' );
        
        todoStore.toggleTodo( todoID );
        displayTodos();

    });

    todoListUL.addEventListener( 'click', ( event ) => {

        const isDestroy = event.target.className === 'destroy';
        const elementDataID = event.target.closest( '[data-id]' );
        
        if ( !elementDataID || !isDestroy ) return;

        const todoID = elementDataID.getAttribute( 'data-id' );
        
        todoStore.deleteTodo( todoID );
        displayTodos();

    });

    clearCompletedButton.addEventListener( 'click', () => {

        todoStore.deleteCompleted();
        displayTodos();

    });

    filtersLIs.forEach( element => {
    
        element.addEventListener( 'click', ( element ) => {
            
            filtersLIs.forEach( el => el.classList.remove( 'selected' ) ); // Remueve el css selected de los filtros.
            element.target.classList.add( 'selected' );// Agrega el css selected solo al filtro seleccionado.

            switch ( element.target.id ) {
                case 'Todos':
                    todoStore.setFilter( Filters.All );
                    break;
                
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending );
                    break;
                
                case 'Completados':
                    todoStore.setFilter( Filters.Completed );
                    break;
            }

            displayTodos();

        });

    });

}