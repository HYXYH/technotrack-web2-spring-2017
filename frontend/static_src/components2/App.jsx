import React from 'react';
// import PostList from './PostList';
// import FollowList from './FollowList';
// import MyBlock from './MyBlock';
// import PostForm from './PostForm';
import MyProfile from './MyProfile';
import Navbar from './Navbar';
import Feed from './Feed';
import { Switch, Route, Link } from 'react-router-dom';
import apiUrls from './../constants/apiUrls';


class App extends React.Component {
    state = {
        postList: [],
        isLoading: true,
        following: [],
        page: 0,
    };


    render() {
        return (
            <div>
                <Navbar/>
                {/*<MyProfile/>*/}
                <Switch>
                    <Route exact path="/" component={ () => <Feed menuType={0}/> } />
                    <Route exact path="/users/" component={ () => <Feed menuType={1}/> } />
                    <Route exact path="/me/" component={ () => <MyProfile/> } />
                </Switch>
            </div>
        );
    }
}

export default App;