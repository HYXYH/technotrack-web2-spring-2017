import update from 'react-addons-update';
import { ADD_EVENT, DELETE_EVENT, SHOW_EVENT, HIDE_EVENT } from './../actions/notifications';

const initialState = {
    eventList: [],
    currentEvent: "",
    isShowing: false,
};

export default function events(store = initialState, action) {
    let newStore = store;
    switch (action.type) {
        case ADD_EVENT: {
            return update(newStore, {
                eventList: {$set: [...newStore.eventList, action.payload]},
            });
        }

        case DELETE_EVENT: {
            return update(newStore, {
                isShowing: {$set: false},
                eventList: {$set: [...(newStore.eventList.slice(1))]},
            });
        }

        case SHOW_EVENT: {
            var current = "";
            if (newStore.eventList.length > 0)
                current = newStore.eventList[0];
            return update(newStore, {
                currentEvent: {$set: current},
                isShowing: {$set: true},
            });
        }

        case HIDE_EVENT: {
            return update(newStore, {
                currentEvent: {$set: ""},
            });
        }

        default:
            return newStore;
    }
}
