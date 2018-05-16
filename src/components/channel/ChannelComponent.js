import { h, Component } from 'preact';
import  ChannelListComponent   from '../channelList/ChannelListComponent';
import  ChannelContentComponent   from '../channelContent/ChannelContentComponent';
import axios from 'axios';
import { methods, airbase } from '../../config/config';
import ChannelTimeTable from "../channelContent/ChannelTimeTable/ChannelTimeTable";

export default class ChannelComponent extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            numberVideo: 1,
            numberChannel: 1,
            prevChannel: 1,
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.clickVideo = this.clickVideo.bind(this);


    }

    componentDidMount() {
        const req = axios.get('https://api.airtable.com/v0/appOB5mr27kviHhs1/Table%201?api_key=key9vUtCwtJJiUzrp&view=Grid%20view');
        const req2 = axios.get('https://api.airtable.com/v0/appOB5mr27kviHhs1/Table%202?api_key=key9vUtCwtJJiUzrp&view=Grid%20view');
        Promise.all([req, req2])
            .then( ([response,response2  ]) => {
                this.setState( prevState => ({
                            data: [
                                response.data.records,
                                response2.data.records,
                            ]
                        }
                    )
                )}
            )
            .catch((error) => {
                console.log(error);
            });
    }

    clickVideo(numbChannel,value) {
        if(!value){
            this.setState({
                numberChannel: numbChannel,
                numberVideo:1
            })
        } else {
            let numberVideo = Number(value)+Number(1);
            let numberChannel = Number(numbChannel)+Number(1);
            this.setState({
                numberVideo: numberVideo,
                numberChannel: numberChannel,
                prevChannel: numberVideo
            })
        }
    }


    render( { channel, slug } ) {
        let airtables = airbase.tables;
        let channelConfig = methods.getAirtablesId(airtables);
        return (
            <div >
                <ChannelContentComponent
                    channel={this.props.channel}
                    slug={this.props.slug}
                    getPropsToChildComponent={ this.state.data[channel - 1] }
                    getPropsToChildData={ this.state.data }
                    url={ `${/ch/}`}
                    channelId={channelConfig}
                    numberVideo={this.state.numberVideo}
                    numberChannel={this.state.numberChannel}
                    prevChannel={this.state.prevChannel}
                />
                <ChannelTimeTable
                    url="/ch/"
                    getPropsToChildComponent={ this.state.data }
                    channelId={channelConfig}
                    clickVideo={this.clickVideo}
                />
                {/*<ChannelListComponent
                    url="/ch/"
                    channelId={channelConfig}
                />*/}
            </div>
        );
    }


}
