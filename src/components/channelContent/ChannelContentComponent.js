import { h, Component } from 'preact';
import ReactPlayer from 'react-player'

export default class ChannelContentComponent extends Component {

    constructor(props) {
        super(props);
        this.state ={
            url: '',
            name: '',
            playing: true,
            volume: 0.5,
            click: 4,
            countVideo: 0
        };
    }

    componentWillReceiveProps(props){
        this.getUrl(props);
        if (this.state.click <= this.state.countVideo+3 ) {
            this.setState({click:4})
        }
    }

    getUrl(props) {

        props.getPropsToChildComponent && props.getPropsToChildComponent
            .map( (item, index) => {
                if(index === 1) {
                    let keys = Object.keys(item.fields).length;
                    this.setState({
                        url: item.fields[`Field ${4}`],
                        countVideo: keys-1
                    });
                }
            });

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
        this.props.getPropsToChildComponent && this.props.getPropsToChildComponent
            .map( (item, index) => {
                if(this.state.click === 4 ) { // все кроме последнего
                    if (index === 1) {
                        this.setState({
                            url : item.fields[`Field ${this.state.countVideo+3}`],
                            click: this.state.click + (+this.state.countVideo-1),

                        });
                    }
                }
                else {
                    if (index === 1) {
                        this.setState({
                            url : item.fields[`Field ${this.state.click-1}`],
                            click: this.state.click-1,
                        });
                    }
                }
            });
    }

    nextButton() {
        this.props.getPropsToChildComponent && this.props.getPropsToChildComponent
            .map( (item, index) => {
                if(this.state.click < this.state.countVideo+3) {
                    if (index === 1) {
                        this.setState({
                            url : item.fields[`Field ${this.state.click+1}`],
                            click: this.state.click+1,
                        });
                    }
                } else if (this.state.click === this.state.countVideo+3) {  // its last video
                    if (index === 1) {
                        this.setState({
                            url : item.fields[`Field ${ (+this.state.click - +this.state.countVideo) +1}`],
                            click: (+this.state.click - +this.state.countVideo) + 1,
                        });
                    }
                }
            });
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
                                   return item.fields[`Field ${this.state.click}`]
                               }
                        })}
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
                <button onClick={() => this.prevButton()} >Пред. Видео</button>
                <button onClick={() => this.nextButton()} >След. Видео</button>
            </div>
        );
    }
}
