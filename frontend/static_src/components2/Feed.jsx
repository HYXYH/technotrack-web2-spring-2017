import React from 'react';
import PropTypes from 'prop-types';
import ContentMenu from './ContentMenu';
import UsersMenu from './UsersMenu';
import PostList from './PostList';
import UserList from './UserList';
import {Segment, Grid, Sticky} from 'semantic-ui-react'


class Feed extends React.Component {
    static propTypes = {
        menuType: PropTypes.number.isRequired,
    };

    state = {};

    handleContextRef = contextRef => this.setState({contextRef});

    render() {
        const {contextRef} = this.state;
        let menu = <ContentMenu/>;
        let feed = <PostList/>;

        if (this.props.menuType === 1) {
            menu = <UsersMenu/>;
            feed = <UserList/>;
        }

        return (
            <div>
                <Grid>
                    <Grid.Column width={4}>
                        <Sticky offset={100}>
                            { menu }
                        </Sticky>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        {feed}
                    </Grid.Column>
                    <Grid.Column width={1}>
                    </Grid.Column>
                </Grid>
            </div>

        );
    }
}

export default Feed;