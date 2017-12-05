import update from 'react-addons-update';
import { START_POST_LOADING, SUCCESS_POST_LOADING, ERROR_POST_LOADING } from './../actions/posts';
import { START_POST_SENDING, SUCCESS_POST_SENDING, ERROR_POST_SENDING } from './../actions/posts';

const initialState = {
    postList: [],
    isLoading: false,
    isSending: false,
};


export default function posts(store = initialState, action) {
    let newStore = store;
    if (action.payload && action.payload.entities && action.payload.entities.posts) {
        newStore = update(store, {
            // posts: { $merge: action.payload.entities.posts },
        });
    }

    switch (action.type) {
        case START_POST_LOADING: {
            return update(newStore, {
                isLoading: { $set: true },
            });
        }
        case SUCCESS_POST_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
                postList: { $set: action.payload },
            });
        }
        case ERROR_POST_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
            });
        }

        case START_POST_SENDING: {
            return update(newStore, {
                isSending: { $set: true },
            });
        }
        case SUCCESS_POST_SENDING: {
            return update(newStore, {
                isSending: { $set: false },
                postList: { $set: [action.payload, ...newStore.postList] },
            });
        }
        case ERROR_POST_SENDING: {
            return update(newStore, {
                isSending: { $set: false },
            });
        }
        default:
            return newStore;
    }
}