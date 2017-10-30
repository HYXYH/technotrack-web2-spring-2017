import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadUsers} from './../actions/users';
import apiUrls from './../constants/apiUrls';

import User from './User';


class UserList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        userList: PropTypes.arrayOf(PropTypes.number),
        loadUsers: PropTypes.func.isRequired,
    }

    static defaultProps = {
        userList: [],
        isLoading: false,
    }

    componentDidMount() {
        //todo:
        //subscribe (CHANGE_ITEM)
        // if (Все пользователи)
        // url = apiUrls.users
        // нужно в api сделать
        //       /users/me/followers - fixme
        //       /users/me/following - ok
        //       /users/me/posts     - ok
        //       /events/posts
        //
        // переделать events, чтобы отдавать ещё и content_type и obj_id, или лучше сразу объект

        // как в django на любую страницу кроме api отдавать react?
        this.props.loadUsers(apiUrls.users);
    }

    render() {
        if (this.props.isLoading) {
            return <center>Загрузка...</center>;
        }

        const users = this.props.userList.map(
            item => <User key={ item.id }
                          id={ item.id }
                          username={ item.username }
                          firstname={ item.first_name }
                          lastname={ item.last_name }
                          email={ item.email }
                          following={item.following}/>,
        );
        return (
            <div>{ users }</div>
        );
    }
}


const mapStateToProps = ({users}) => {
    return {
        userList: users.userList,
        isLoading: users.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loadUsers}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(UserList);