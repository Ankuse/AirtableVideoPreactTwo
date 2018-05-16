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
            numberVideo: props.numberVideo,
            numberChannel: props.numberChannel,
            prevChannel: props.prevChannel,
            clickToTop: false,
            clickToBot: false,
        };

        this.urlToBot = this.urlToBot.bind(this);
    }

    componentWillReceiveProps(props) { // приходят пропсы текущего канала.
        this.setState({ // приходит новый канал и номер видео по которому был click
            numberChannel: props.numberChannel,
            numberVideo: props.numberVideo,
            prevChannel: props.prevChannel,
        });

        if (this.state.numberVideo > 1) { // при загрузке === 1 поэтому грузит 1-е видео c функции getUrl, после грузит по клику.
            // забрали номер канала где находится видео, и номер видео в канале.
            let numbChannel = this.state.numberChannel - 1;
            let numbVideo = this.state.numberVideo - 1;
            this.setState({
                url: String(props.getPropsToChildData[numbChannel][numbVideo].fields.Url),
                name: String(props.getPropsToChildData[numbChannel][numbVideo].fields.Name),
            });
        } else { // if есть /:slug то грузим видео с этим /:slug , если /:slug нет - грзуим первое видео с канала
            let arr = props.getPropsToChildComponent && props.getPropsToChildComponent.filter( (elem) => {
                return props.slug === elem.fields.Slug
             });
            if(this.props.slug){
                this.setSlugUrl(arr)
            } else {
                this.getUrl(props)
            }
        }

        if(this.state.clickToTop) { // был клик по кнопке вверх
            if( Number(this.props.channel) <  props.getPropsToChildData.length) { // переключаем канал
                this.urlToTop(props);
            } else {
                console.log("Каналов больше нет ! ")
            }
        }

        if(this.state.clickToBot) { // был клик по кнопке вниз
            if( Number(this.props.channel) > 1  ) { // переключаем канал
                this.urlToBot(props);
            } else {
                console.log(" Это первый канал ! Прекрати кликать !  ")
            }
        }

    }

    urlToBot(props) {
        if( !this.state.clickToBot ){
            this.setState({
                clickToBot: true
            });
        } else {
            this.urlToBotTwo(props)
        }
    }

    urlToBotTwo(props) {
        if( Number(this.props.channel) > 1  ) {
            this.setState({
                url: String(props.getPropsToChildData[props.channel - 1][0].fields.Url),
                name: String(props.getPropsToChildData[props.channel - 1][0].fields.Name),
                clickToBot: false
            });
        }
    }

    urlToTop(props) {
        if( !this.state.clickToTop ){ // кликнули - ставим в стейт что клик true
            this.setState({
                clickToTop: true
            });
        } else { // так как clickToTop = true то выполняем:
            this.urlToTopTwo(props)
        }

    }

    urlToTopTwo(props) {
        if( parseInt(this.props.channel) < this.props.getPropsToChildData.length ){
            // if numberVideo === 1
            this.setState({
                url: String(props.getPropsToChildData[props.channel-1][0].fields.Url), // без this для переключения 1-ого видео
                name: String(props.getPropsToChildData[props.channel-1][0].fields.Name), // без this для переключения 1-ого видео
                clickToTop: false
            });
            // if numberVideo > 1 тоже самое только с this.props в url и name
        }
    }

    setSlugUrl(arr) {
        this.setState({
            url: arr[0].fields.Url,
            name: arr[0].fields.Name,
        });
    }

    getUrl(props) { // ставим в урл первое видео плейлиста
        this.setState({
            url: props.getPropsToChildComponent[0].fields.Url,
            name: props.getPropsToChildComponent[0].fields.Name,
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
        if(this.state.numberVideo === 1) { // текущее видео номер 1
            this.setState({
                numberVideo: this.state.numberVideo + ( this.props.getPropsToChildComponent.length - 1 )
            });
            this.setState({
                url: this.props.getPropsToChildComponent[this.state.numberVideo -1].fields.Url,
                name: this.props.getPropsToChildComponent[this.state.numberVideo -1].fields.Name
            });
        } else {
            this.setState({
                numberVideonumberVideo: this.state.numberVideo -1,
            });
            this.setState({
                url: this.props.getPropsToChildComponent[this.state.numberVideo -1].fields.Url,
                name: this.props.getPropsToChildComponent[this.state.numberVideo -1].fields.Name
            });
        }

    }

    nextButton() {
        if(this.state.numberVideo < this.props.getPropsToChildComponent.length) {
            this.setState({
                numberVideo: this.state.numberVideo + 1,
            }); // чтобы установить урл , от клика, необходимо 2 setState
            this.setState({
                url: this.props.getPropsToChildComponent[this.state.numberVideo - 1].fields.Url,
                name: this.props.getPropsToChildComponent[this.state.numberVideo - 1].fields.Name
            });
        } else if (this.state.numberVideo === this.props.getPropsToChildComponent.length) {
            this.setState({
                numberVideo: 1,
            });
            this.setState({
                url: this.props.getPropsToChildComponent[this.state.numberVideo - 1].fields.Url,
                name: this.props.getPropsToChildComponent[this.state.numberVideo - 1].fields.Name
            });
        }
    }






    render( {channel, url, channelId, getPropsToChildComponent}, state, props ) {
        return (
            <div >
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
                <a href={url + (this.props.channel > 1 ? Number(this.props.channel) - Number(1) : this.props.channel) } onClick={() => this.urlToBot()}>Вниз ▼</a>
                <a href={url + (this.props.channel >=1 && this.props.channel < this.props.channelId.length ? Number(this.props.channel) + Number(1) : this.props.channel) } onClick={() => this.urlToTop()} >Вверх ▲</a>
                {/*<button onClick={() => this.prevChannel(channel)} >Вниз ▼</button>*/} {/*Alt 31*/}
                {/*<button onClick={() => this.nextChannel()} >Вверх ▲</button>*/} {/*Alt 30*/}
            </div>
        );
    }
}
