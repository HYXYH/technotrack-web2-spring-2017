import React from 'react';
import {Form, TextArea, Menu, Button, Divider, Modal, Header} from 'semantic-ui-react'
import {bindActionCreators} from 'redux';
import {sendComment} from './../actions/comments';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import apiUrls from './../constants/apiUrls';


const DEFAULT_STATE = {
    text: '',
    errors: {}
};


class CreateComment extends React.Component {
    state = DEFAULT_STATE;

    static propTypes = {
        objectId: PropTypes.number.isRequired,
        contentType: PropTypes.number.isRequired,

        trigger: PropTypes.node.isRequired,
        sendComment: PropTypes.func.isRequired,
        isCommentSending: PropTypes.bool,
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmitClick = (e, {name}) => this.props.sendComment(apiUrls.comments,
        this.props.contentType, this.props.objectId, this.state.text);

    render() {

        if (this.props.isCommentSending) {
            return <center>Заливаем коммент...</center>;
        }

        return (
            <div>
                <Modal trigger={this.props.trigger}>
                    <Modal.Header>Новый комментарий</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.TextArea name="text" onChange={this.onChange} label='Текст коммента'
                                           placeholder='Буквы писать сюда'/>
                            <Form.Button onClick={this.handleSubmitClick}>ок</Form.Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = ({posts}) => {
    return {
        isCommentSending: posts.isCommentSending,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({sendComment}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);