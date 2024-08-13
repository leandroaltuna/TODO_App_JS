import { UuidAdpater } from "../../config/uuid.adapter";


export class Todo {

    /**
     * 
     * @param { String } description 
     */
    constructor( description ) {
        
        this.id = UuidAdpater.v4();
        this.description = description;
        this.done = false;
        this.createdAt = new Date();

    }


}