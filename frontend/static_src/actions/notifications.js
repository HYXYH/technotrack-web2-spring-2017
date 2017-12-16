export const ADD_EVENT = 'ADD_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const SHOW_EVENT = 'SHOW_EVENT';
export const HIDE_EVENT = 'HIDE_EVENT';

var eventCount = 0;

export const addEvent = (message) => {
    return (function (dispatch) {
        var show = eventCount == 0;
        eventCount += 1;
        dispatch({
            type: ADD_EVENT,
            payload: message,
        });
        if (show) {
            dispatch(showEvent());
        }
        // setTimeout(dispatch, 5000, {type: DELETE_EVENT});
    })
};


export const showEvent = () => {
    return (function (dispatch) {
        dispatch({
            type: SHOW_EVENT,
        });
        // setTimeout(dispatch, 100, {type: SHOW_EVENT});
        setTimeout(dispatch, 5000, hideEvent());
    })
}

export const hideEvent = () => {
    return (function (dispatch) {
        dispatch({
            type: HIDE_EVENT,
        });
        setTimeout(dispatch, 1000, deleteEvent());
    })
}

export const deleteEvent = () => {
    return (function (dispatch) {
        dispatch({
            type: DELETE_EVENT,
        });
        eventCount -= 1;
        if (eventCount > 0) {
            setTimeout(dispatch, 0, showEvent());
        }
    })
}
