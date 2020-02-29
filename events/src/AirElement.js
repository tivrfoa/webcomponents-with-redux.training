import { render } from "./lib/lit-html.js";
import { createStore } from "./lib/redux.js";

const deepCopy = input => JSON.parse(JSON.stringify(input));

const events = (state = { events: [] }, action) => { 
    const { type, payload } = action;
    switch (type) { 
        case 'NEW_EVENT_CREATED':
            return deepCopy({
                events: state.events.concat(payload)
            });    
    }
    console.log(state,action);
    return state;
}
const store = createStore(events,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default class AirElement extends HTMLElement { 

    constructor() { 
        super();
        this.state = {};
    }

    connectedCallback() { 
        store.subscribe(_ => this.triggerViewUpdate());
        this.triggerViewUpdate();
    }

    triggerViewUpdate() { 
        this.state = store.getState();
        const template = this.view();
        render(template,this);
    }

    view() { }

}

export { store };