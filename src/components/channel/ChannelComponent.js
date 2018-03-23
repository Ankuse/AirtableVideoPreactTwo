import { h, Component } from 'preact';
import  ChannelListComponent   from '../channelList/ChannelListComponent';
import  ChannelContentComponent   from '../channelContent/ChannelContentComponent';
import axios from 'axios';
import { methods, airbase } from '../../config/config';

export default class ChannelComponent extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
        };

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        const req = axios.get('https://api.airtable.com/v0/appOB5mr27kviHhs1/Table%201?api_key=key9vUtCwtJJiUzrp');
        const req2 = axios.get('https://api.airtable.com/v0/appOB5mr27kviHhs1/Table%202?api_key=key9vUtCwtJJiUzrp');
        const req3 = axios.get('https://api.airtable.com/v0/appOB5mr27kviHhs1/Table%203?api_key=key9vUtCwtJJiUzrp');
        Promise.all([req, req2, req3])
            .then( ([response,response2, response3]) => {
                this.setState( prevState => ({
                            data: [
                                response.data.records,
                                response2.data.records,
                                response3.data.records
                            ]
                        }
                    )
                )}
            )
            .catch((error) => {
                console.log(error);
            })


    }


    render( { channel } ) {
        let airtables = airbase.tables;
        let channelConfig = methods.getAirtablesId(airtables);
        return (
            <div >
                <ChannelContentComponent
                    channel={this.props.channel}
                    getPropsToChildComponent={ this.state.data[channel -1] }
                    url="/ch/"
                />
                <ChannelListComponent
                    url="/ch/"
                    channelId={channelConfig}
                    path={channel}
                />
                CheldrenApi
            </div>
        );
    }


}
