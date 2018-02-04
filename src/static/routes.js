import React from 'react';
import { Route, Switch } from 'react-router';
import { 
    HomeView, 
    LoginView, 
    RegisterView, 
    ProtectedView, 
    IntroduceView, 
    NotFoundView,
    SurroundingView,
    ForumView,
    ForumNewPostView,
    PostDetailView,
    ProfileView
 } from './containers';
import requireAuthentication from './utils/requireAuthentication';

const ForumChildRoute = ({match}) => (
    <div>
        <Route exact path={`${match.url}/new-post`} component={ForumNewPostView} />
        <Route exact path={`${match.url}/`} component={ForumView} />
    </div>
)

export default(
    <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/login" component={LoginView} />
        <Route path="/register" component={RegisterView} />
        <Route path="/protected" component={requireAuthentication(ProtectedView)} />
        <Route path="/introduce" component={IntroduceView} />
        <Route path="/surrounding" component={SurroundingView} />
        <Route path="/forum/detail/:topicId" component={PostDetailView} />
        <Route path="/forum" component={ForumChildRoute} />
        <Route path="/profile" component={ProfileView} />
        <Route path="*" component={NotFoundView} />
    </Switch>

);
