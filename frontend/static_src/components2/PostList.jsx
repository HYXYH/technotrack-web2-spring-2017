import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadPosts} from './../actions/posts';
import apiUrls from './../constants/apiUrls';

import Post from './Post';


class PostList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        postList: PropTypes.arrayOf(PropTypes.object),
        loadPosts: PropTypes.func.isRequired,
    }

    static defaultProps = {
        postList: [],
        isLoading: false,
    }

    componentDidMount() {
        this.props.loadPosts(apiUrls.posts);
    }

    render() {
        if (this.props.isLoading) {
            return <center>Загрузка...</center>;
        }

        const posts = this.props.postList.map(
            item => <Post key={ item.id } id={ item.id } text={ item.text } author={ item.author }
                          likes_count={item.likes_count}/>,
        );
        return (
            <div>{ posts }</div>
        );
    }
}


const mapStateToProps = ({posts}) => {
    return {
        postList: posts.postList,
        isLoading: posts.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loadPosts}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(PostList);