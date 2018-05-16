import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import ChannelComponent from './channel/ChannelComponent';
import style from './style.css';
import Redirect from "../routes/redirect/Redirect";
import axios from 'axios';

//import Profile from '../routes/profile';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

if (module.hot) {
	require('preact/debug');
}

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app" class={style.all}>
				<Header />
                <Router onChange={this.handleRoute}>
                    <ChannelComponent path="ch/:channel/:slug?"
                    />
                    <Redirect path="/" to="ch/1/" />
                </Router>
			</div>
		);
	}
}
