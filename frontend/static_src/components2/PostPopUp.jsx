import React from 'react'
import {cent} from 'react-cent'
import {Label, Segment, Transition} from 'semantic-ui-react'
import {addEvent, showEvent} from '../actions/notifications'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// Make Centrifuge client accessible through `this.props.cent`
@cent
class PostPopUp extends React.Component {
    static propTypes = {
        eventList: PropTypes.arrayOf(PropTypes.string),
        currentEvent: PropTypes.string,
        addEvent: PropTypes.func.isRequired,
        showEvent: PropTypes.func.isRequired,
        isShowing: PropTypes.bool,
    };

    constructor(props) {
        super(props)
        // Subscribe on `site-metrics` channel.
        let data = document.querySelector('#centrifuge').dataset || {};
        this.props.cent.subscribe('events-' + data.user, message => {
            this.handleMessage(message)
        }).history().then(history => {
            this.handleHistory(history)
        })
    }

    render() {
        let visible = true;
        if (this.props.currentEvent == "")
            visible = false;

        return (
            <Transition.Group animation="slide right" duration='500'>
                {visible &&
                <Label
                    style={{position: "absolute", top: "10px"}}
                    pointing='left'
                    basic
                    color='green'
                    size='large'>
                    {this.props.currentEvent}
                </Label>}
            </Transition.Group>)
    }

    handleMessage = (message) => {
        this.props.addEvent(message.data);
        if (this.props.currentEvent == "" &&
            this.props.isShowing == false &&
            this.props.eventList.length > 0) {
            this.props.showEvent();
        }
    }

    handleHistory(history) {
        console.log('history', history.data)
    }
}

const mapStateToProps = ({events}) => {
    return {
        eventList: events.eventList,
        currentEvent: events.currentEvent,
        isShowing: events.isShowing,
    };
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({addEvent, showEvent}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPopUp);
