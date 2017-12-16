import { CALL_API, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';

// import { user } from './../utils/schemas';

export const START_LIKE_SENDING = 'START_LIKE_SENDING';
export const SUCCESS_LIKE_SENDING = 'SUCCESS_LIKE_SENDING';
export const ERROR_LIKE_SENDING = 'ERROR_LIKE_SENDING';


export const sendLike = (url, content_type, object_id) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'POST',
            body: JSON.stringify({"content_type": content_type, "object_id": object_id}),
            headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': document.cookie.match(/csrftoken=([^ ;]+)/)[1]
                },
            types: [
                {type: START_LIKE_SENDING,
                payload: {content_type, object_id}
                },
                {
                    type: SUCCESS_LIKE_SENDING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => {
                                console.log(json);
                                return json
                            },
                        );
                    },
                },
                ERROR_LIKE_SENDING,
            ],
        },
    };
};
