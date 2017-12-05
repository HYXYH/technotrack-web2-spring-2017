import React, {Component} from 'react'
import CreatePost from './CreatePost'
import {Form, TextArea, Menu, Button, Divider, Modal, Header} from 'semantic-ui-react'

export default class FeedMenu extends Component {
    state = {activeItem: 'Посты в мире'}

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {activeItem} = this.state

        return (
            <div>
                <Menu fluid vertical tabular>
                    <Menu.Item name='Все события' active={activeItem === 'Все события'} onClick={this.handleItemClick}/>
                    <Menu.Item name='Посты друзей' active={activeItem === 'Посты друзей'}
                               onClick={this.handleItemClick}/>
                    <Menu.Item name='Мои посты' active={activeItem === 'Мои посты'} onClick={this.handleItemClick}/>
                    <Divider hidden/>
                    <Menu.Item name='Посты в мире' active={activeItem === 'Посты в мире'}
                               onClick={this.handleItemClick}/>

                </Menu>
                <CreatePost trigger={<Button color='green' attached="bottom">Добавить пост</Button>}/>
            </div>
        )
    }
}
