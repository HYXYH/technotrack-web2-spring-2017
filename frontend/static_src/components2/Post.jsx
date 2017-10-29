import React from 'react';
import {Icon, Card} from 'semantic-ui-react'
import PropTypes from 'prop-types';


class PostComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        author: PropTypes.object,
        likes_count: PropTypes.number,
        comments_count: PropTypes.number,
        text: PropTypes.string,
    };

    static defaultProps = {
        id: 0,
        author: null,
        likes_count: 0,
        comments_count: 0,
        text: '',
    };

    render() {
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        <Icon name='user'/> {this.props.author.username }
                    </Card.Header>
                    <Card.Description>
                        { this.props.text }
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='like'/> {this.props.likes_count}
                </Card.Content>
            </Card>
        );
    }
}

export default PostComponent;