import update from 'react-addons-update';


const CHANGE_ITEM = 'CHANGE_ITEM';


const initialState = {
    activeItem: 'Все пользователи'
};


export default function posts(store = initialState, action) {
    let newStore = store;

    switch (action.type) {
        case CHANGE_ITEM: {
            return update(newStore, {
                activeItem: { $set: action.payload.name  },
            });
        }
        default:
            return newStore;
    }
}