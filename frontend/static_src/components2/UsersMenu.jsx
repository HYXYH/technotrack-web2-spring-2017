import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeItem} from './../actions/UsersMenu';
import PropTypes from 'prop-types';
import { Menu, Divider } from 'semantic-ui-react'

class UsersMenu extends Component {
    static propTypes = {
        changeItem: PropTypes.func.isRequired,
        activeItem: PropTypes.string,
    }

    render() {
        return (
            <Menu fluid vertical tabular>
                <Menu.Item name='Мои подписки' active={this.props.activeItem === 'Мои подписки'} onClick={this.props.changeItem}/>
                <Menu.Item name='Подписчики' active={this.props.activeItem === 'Подписчики'} onClick={this.props.changeItem}/>
                 <Divider hidden/>
                <Menu.Item name='Все пользователи' active={this.props.activeItem === 'Все пользователи'} onClick={this.props.changeItem}/>
            </Menu>
        )
    }
}


const mapStateToProps = ({UsersMenu}) => {
    return {
        activeItem: UsersMenu.activeItem,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({changeItem}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersMenu);