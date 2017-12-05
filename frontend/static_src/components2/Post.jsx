import React from 'react';
import {Icon, Card, Label, Container, Button, Grid} from 'semantic-ui-react'
import {showPostDetails} from './../actions/posts'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


class PostComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        author: PropTypes.object,
        likes_count: PropTypes.number,
        comments_count: PropTypes.number,
        text: PropTypes.string,

        showPostDetails: PropTypes.func.isRequired,
    };

    static defaultProps = {
        id: 0,
        author: null,
        likes_count: 0,
        comments_count: 0,
        text: '',
    };

    handleShowDetailsClick = (e) => this.props.showPostDetails(this.props.id);

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
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={2}>
                                <Icon name='like'/> {this.props.likes_count}
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
    return bindActionCreators({showPostDetails}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(PostComponent);
