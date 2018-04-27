import { h, Component } from 'preact';
import ReactPlayer from 'react-player'

export default class ChannelContentComponent extends Component {

    constructor(props) {
        super(props);
        // TODO: сделать громкость на 0.5
        this.state ={
            url: '',
            name: '',
            playing: true,
            volume: 0.0,
            clickQ: props.clickQ,
            numberChannel: props.numberChannel,
            clickChannel: false,
            clickChannelNumber: props.clickChannelNumber
        };

        this.urlToBot = this.urlToBot.bind(this);
    }



    componentWillReceiveProps(props){ // приходят пропсы текущего канала.
        //debugger;
        this.setState({
            clickChannel: props.clickChannel,
            clickChannelNumber: props.clickChannelNumber
        });


        if(this.state.clickQ > 1){ // при загрузке === 1 поэтому грузит 1-е видео c функции getUrl, после грузит по клику.
            this.setState({
                clickQ: props.clickQ
            });
            //debugger;
            // забрали номер канала где находится видео, и номер видео в канале.
            let numbChannel = this.state.numberChannel -1;
            let numbVideo = this.state.clickQ -1;
            this.setState({
                url: String(props.getPropsToChildData[numbChannel][numbVideo].fields.Url),
                name: String(props.getPropsToChildData[numbChannel][numbVideo].fields.Name),
            });
        } else {
            this.getUrl(props);
        }

        /*if(this.state.clickChannel){
            //debugger;
            //this.setState({clickQ: 1});
            this.getUrlChange(props);
            this.changeBool(props)
        }*/

    }

    getUrl(props) { // ставим в урл первое видео плейлиста
        //debugger;
        this.setState({
            url: props.getPropsToChildComponent[0].fields.Url,
            name: props.getPropsToChildComponent[0].fields.Name,
            clickQ: props.clickQ
        });
    }

    getUrlChange(props) { // ставим в урл первое видео плейлиста
        //debugger;
        this.setState({
            url: props.getPropsToChildData[this.state.clickChannelNumber - 1][0].fields.Url,
            name: props.getPropsToChildData[this.state.clickChannelNumber - 1][0].fields.Name,
            clickQ: props.clickQ,
            clickChannel: false
        });
    }

    clickChannel(idx) {
        //debugger;
        let clickIndex = Number(idx)+Number(1);
        this.setState({
            clickChannel: true
        });
        /*this.setState({
            clickChannelNumber: clickIndex
        });*/
    }

    changeBool(){
        this.setState({
            clickChannel: false
        })
    }

    stopButton() {
        this.setState({
            playing: false
        })
    }

    playButton() {
        this.setState({
            playing: true
        })
    }

    volumeButton(steps) {
        const volume = this.state.volume;
        this.setState({
            volume: volume + steps
        })
    }

    prevButton() {
        //debugger;
        if(this.state.clickQ === 1) { // текущее видео номер 1
            this.setState({
                clickQ: this.state.clickQ + ( this.props.getPropsToChildComponent.length - 1 )
            });
            this.setState({
                url: this.props.getPropsToChildComponent[this.state.clickQ -1].fields.Url,
                name: this.props.getPropsToChildComponent[this.state.clickQ -1].fields.Name
            });
        } else {
            this.setState({
                clickQ: this.state.clickQ -1,
            });
            this.setState({
                url: this.props.getPropsToChildComponent[this.state.clickQ -1].fields.Url,
                name: this.props.getPropsToChildComponent[this.state.clickQ -1].fields.Name
            });
        }

    }

    nextButton() {
        //debugger;
        if(this.state.clickQ < this.props.getPropsToChildComponent.length) {
            this.setState({
                clickQ: this.state.clickQ + 1,
            }); // чтобы установить урл , от клика, необходимо 2 setState
            this.setState({
                url: this.props.getPropsToChildComponent[this.state.clickQ - 1].fields.Url,
                name: this.props.getPropsToChildComponent[this.state.clickQ - 1].fields.Name
            });
        } else if (this.state.clickQ === this.props.getPropsToChildComponent.length) {
            this.setState({
                clickQ: 1,
            });
            this.setState({
                url: this.props.getPropsToChildComponent[this.state.clickQ - 1].fields.Url,
                name: this.props.getPropsToChildComponent[this.state.clickQ - 1].fields.Name
            });
        }

        /*if( this.state.clickQ <= this.props.getPropsToChildComponent.length -2  ){ // минус 2 потому что отсчет от нулевого-1, и кликов для переключения на один меньше чем видео.
            this.setState({
                clickQ: this.state.clickQ + 1,
            }); // чтобы установить урл , от клика, необходимо 2 setState
            this.setState({
                url: this.props.getPropsToChildComponent[this.state.clickQ].fields.Url,
                name: this.props.getPropsToChildComponent[this.state.clickQ].fields.Name
            });
        } else {
            this.setState({
                clickQ: 0
            }); // чтобы установить урл , от клика, необходимо 2 setState
            this.setState({
                url: this.props.getPropsToChildComponent[this.state.clickQ].fields.Url,
                name: this.props.getPropsToChildComponent[this.state.clickQ].fields.Name
            });
        }*/
    }

    urlToBot() {
        if(this.props.channel > 1) {
            return Number(this.props.channel) - Number(1)
        } else {
            return this.props.channel
        }
    }

    urlToTop() {
        if(this.props.channel >=1 && this.props.channel < this.props.channelId.length ) {
           return Number(this.props.channel) + Number(1)
        } else {
           return this.props.channel
        }
    }

    render( {channel, url, channelId}, state ) {
        return (
            <div>
                <p>Content Component:</p>
                <h1>Channel : {channel}</h1>
                <br/>
                <div>
                    <p> Name :
                        {this.state.name}
                    </p>
                </div>

                <ReactPlayer
                     url={String(this.state.url)}
                     playing={this.state.playing}
                     controls={false}
                     volume={this.state.volume}
                />

                <button onClick={() => this.stopButton()}>Stop</button>
                <button onClick={() => this.playButton()}>Play</button>
                <button onClick={() => this.volumeButton(0.1)}>Volume +</button>
                <button onClick={() => this.volumeButton(-0.1)}>Volume -</button>
                <button onClick={() => this.prevButton()} >◄ Пред. Видео</button> {/*Alt 17*/}
                <button onClick={() => this.nextButton()} >След. Видео ►</button> {/*Alt 16*/}
                <a href={url + this.urlToBot() }>Вниз ▼</a>
                <a href={url + this.urlToTop() }>Вверх ▲</a>
                {/*<button onClick={() => this.prevChannel(channel)} >Вниз ▼</button>*/} {/*Alt 31*/}
                {/*<button onClick={() => this.nextChannel()} >Вверх ▲</button>*/} {/*Alt 30*/}
            </div>
        );
    }
}
