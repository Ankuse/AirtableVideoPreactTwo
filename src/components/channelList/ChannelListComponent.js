import { h, Component } from 'preact';
import  { ChannelItem }  from '../channelItem/ChannelItem';
import { airbase } from '../../config/config'

export default class ChannelListComponent extends Component {


	render( { url, channelId } ) {
		return (
            <ul>
                { channelId && channelId.map(table => (
                    <li key={table}>
                        <ChannelItem value={table}
                                     href={url + Number (table +1)}
                                     path={this.props.path}
                                     length={airbase.tables.length}
                        />
                    </li>
                ))}
            </ul>
		);
	}
}
