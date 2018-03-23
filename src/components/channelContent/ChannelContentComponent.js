import { h, Component } from 'preact';
import ReactPlayer from 'react-player'

export default class ChannelContentComponent extends Component {

    constructor() {
        super();
        this.state ={
            url: '',
            name: '',
            playing: true,
            volume: 0.5,
        };
    }

    componentDidMount(){
        this.setState({
            url: this.getUrl()
        })

    }

    getUrl() {
        let url = '';
        this.props.getPropsToChildComponent && this.props.getPropsToChildComponent
            .map( (item, index) => {
                if(index === 1) {
                    url = item.fields["Field 4"]
                }
            });
        return url
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
        console.log(this.state.volume);
        const volume = this.state.volume;
        this.setState({
            volume: volume + steps
        })
    }

    prevButton() {
        if (this.props.channel > 1) {
            return +this.props.channel -1
        } else {
            return +this.props.channel
        }
    }

    nextButton() {
        if (this.props.channel >= 1 && this.props.channel <= 2) {
            return +this.props.channel +1
        } else {
            return +this.props.channel
        }
    }

    render( {channel, url }, state ) {
        const getProps = this.props.getPropsToChildComponent;

        return (
            <div>
                <p>Content Component:</p>
                <h1>Channel : {channel}</h1>
                <br/>
                <div>
                    <p> Name :
                        {getProps && getProps.map( (item, index) =>  {
                               if(index === 0) {
                                   return item.fields["Field 4"]
                               }
                        })}
                    </p>
                </div>

                <ReactPlayer
                     url={this.getUrl()}
                     playing={this.state.playing}
                     controls={false}
                     volume={this.state.volume}
                />

                <button onClick={() => this.stopButton()}>Stop</button>
                <button onClick={() => this.playButton()}>Play</button>
                <button onClick={() => this.volumeButton(0.1)}>Volume +</button>
                <button onClick={() => this.volumeButton(-0.1)}>Volume -</button>
                <a href={url + this.prevButton()}>Пред. Видео</a>
                <a href={url + this.nextButton()}>След. Видео</a>




            </div>
        );
    }
}
