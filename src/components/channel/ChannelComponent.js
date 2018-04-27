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
            clickQ: 1,
            numberChannel : 1,
            //clickChannel: false,
            clickChannelNumber: 1
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.clickVideo = this.clickVideo.bind(this);
        this.clickChannel = this.clickChannel.bind(this);
        //this.changeBool = this.changeBool.bind(this);


    }

    componentDidMount() {
        // https://api.airtable.com/v0/appOB5mr27kviHhs1/Table%203?maxRecords=3&view=Grid%20view
        const req = axios.get('https://api.airtable.com/v0/appOB5mr27kviHhs1/Table%201?api_key=key9vUtCwtJJiUzrp&view=Grid%20view');
        const req2 = axios.get('https://api.airtable.com/v0/appOB5mr27kviHhs1/Table%202?api_key=key9vUtCwtJJiUzrp&view=Grid%20view');
        // TODO: убрать 3 канал
        const req3 = axios.get('https://api.airtable.com/v0/appOB5mr27kviHhs1/Table%203?api_key=key9vUtCwtJJiUzrp&view=Grid%20view');
        Promise.all([req, req2, req3])
            .then( ([response,response2, response3 ]) => {
                this.setState( prevState => ({
                            data: [
                                response.data.records,
                                response2.data.records,
                                response3.data.records,
                            ]
                        }
                    )
                )}
            )
            .catch((error) => {
                console.log(error);
            });



    }

    clickVideo(value, numberChannel) {
        let val = Number(value)+Number(1);
        let val2 = Number(numberChannel)+Number(1);
        this.setState({
            clickQ: val,
            numberChannel: val2
        })
    }

    clickChannel(idx) {
        debugger;
        let clickIndex = Number(idx)+Number(1);
        /*this.setState({
            clickChannel: true
        });*/
        this.setState({
            clickChannelNumber: clickIndex
        });
    }

    changeBool(){
        /*this.setState({
            clickChannel: false
        })*/
    }

    render( { channel } ) {
        //console.log(this.state.clickChannel);
        let airtables = airbase.tables;
        let channelConfig = methods.getAirtablesId(airtables);
        return (
            <div >
                <ChannelContentComponent
                    channel={this.props.channel}
                    getPropsToChildComponent={ this.state.data[channel - 1] }
                    getPropsToChildData={ this.state.data }
                    url={ `${/ch/}` }
                    channelId={channelConfig}
                    clickQ={this.state.clickQ}
                    numberChannel={this.state.numberChannel}
                    clickChannel={this.clickChannel}
                    //changeBool={this.changeBool}
                    clickChannelNumber={this.state.clickChannelNumber}
                />
                <ChannelTimeTable
                    url="/ch/"
                    getPropsToChildComponent={ this.state.data }
                    channelId={channelConfig}
                    clickVideo={this.clickVideo}
                    clickChannel={this.clickChannel}
                />
                <ChannelListComponent
                    url="/ch/"
                    channelId={channelConfig}
                />
            </div>
        );
    }


}
