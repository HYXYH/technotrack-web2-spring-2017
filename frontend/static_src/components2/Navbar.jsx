import React from 'react';
import {Link} from 'react-router-dom'
import {Menu, Dropdown, Image,} from 'semantic-ui-react'
import PostPopUp from './PostPopUp';


class Navbar extends React.Component {
    state = {};

    handleContextRef = contextRef => this.setState({contextRef});

    render() {
        const {contextRef} = this.state;
        const logoG = 'https://ih0.redbubble.net/image.280677834.1711/flat,40x40,070,f.u2.jpg';
        const logoR = 'https://t3.rbxcdn.com/d1b264939979094eb58bc21d0764695a';
        return (
            <Menu fixed='top'>

                <Menu.Item>
                    <Image spaced='right' src={logoG}/>
                    Pepetter
                </Menu.Item>

                <Dropdown item icon='user' simple>
                    <Dropdown.Menu>
                        <Dropdown.Item><Link to="/me/"> Me </Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/"> Feed </Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/users/"> following </Link></Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Log out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <PostPopUp/>
            </Menu>
        );

    }
}

export default Navbar;