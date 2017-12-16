import React from 'react';
import {Icon, Card, Label, Container, Button, Grid} from 'semantic-ui-react'
import {showPostDetails} from './../actions/posts'
import {sendLike} from './../actions/likes'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import apiUrls from './../constants/apiUrls';


class PostComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        author: PropTypes.object,
        likes_count: PropTypes.number,
        isLiked: PropTypes.bool,
        myContentType: PropTypes.number,
        comments_count: PropTypes.number,
        text: PropTypes.string,

        showPostDetails: PropTypes.func.isRequired,
        sendLike: PropTypes.func.isRequired,
    };

    static defaultProps = {
        id: 0,
        author: null,
        likes_count: 0,
        isLiked: false,
        myContentType: 8,
        comments_count: 0,
        text: '',
    };

    handleShowDetailsClick = (e) => this.props.showPostDetails(this.props.id);

    // todo:
    handleLikeClick = (e) => this.props.sendLike(apiUrls.likes, this.props.myContentType, this.props.id);

    render() {
        let likeButton = <Icon name='like' onClick={this.handleLikeClick}/> ;
        if (this.props.isLiked)
            likeButton = <Icon color="red" name='like' onClick={this.handleLikeClick}/>;
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
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={2}>
                                {likeButton} {this.props.likes_count}
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Icon link onClick={this.handleShowDetailsClick} name='comments'/>{this.props.comments_count}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card>
        );
    }
}


const mapStateToProps = ({posts}) => {
    return {};
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({showPostDetails, sendLike}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(PostComponent);
