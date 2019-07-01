import React, {Component} from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.constraints = window.constraints = {
            audio: false,
            video: {width: {exact: 1920}, height: {exact: 1080}}
        };
        this.state = {
            load: false,
            error:false,
            errorMessage:''
        };
    }


    componentDidMount() {
            this.create();
    }

    create =()=>
    {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(this.constraints)
                .then(this.successCallback)
                .catch(this.errorCallback);
        }
    }
    successCallback=(stream)=>{
        const video = document.querySelector('#videoElement');

        let videoTracks = stream.getVideoTracks();
            console.log('Got stream with constraints:', this.constraints);

            console.log('videoTracks' + videoTracks[0]);//add

            console.log('Using video device: ' + videoTracks[0].label);
            console.log('stream' + stream);//add
            console.log('stream id' + stream.id);//add

            stream.onremovetrack = function() {
                console.log('Stream ended');
            };
            window.stream = stream; // make variable available to browser console
            video.srcObject = stream;
        console.log('stream.active: ',stream.active);
        console.log('video stream success');

        this.setState({
            load:stream.active
        })
    }
    errorCallback=(error)=>{
        console.log(error,error.name);
        let errorMsg = 'getUserMedia error:' + error.name;
        if (error.name === 'ConstraintNotSatisfiedError') {
                errorMsg='The resolution ' + this.constraints.video.width.exact + 'x' +
                    this.constraints.video.width.exact + ' px is not supported by your device.'
            } else if (error.name === 'PermissionDeniedError') {
                errorMsg='Permissions have not been granted to use your camera and ' +
                    'microphone, you need to allow the page access to your devices in ' +
                    'order for the demo to work.';
            }
        if(error !=="undefined"){
            console.log(error);

        }
            this.setState({
                error:true,
                errorMessage:errorMsg,
            })
    }
    videoRelease =()=> {
        let stream = this.video.srcObject;
        let tracks = stream.getTracks();

        for (let i = 0; i < tracks.length; i++) {
            let track = tracks[i];
            track.stop();
        }
        this.video.srcObject = null;
        this.setState({
            load:stream.active
        })
    }
    render() {
      const container =  {
        margin: '0px auto',
        width: '800px',
        height: '450px',
        textAlign: 'center'
    }
      const videoElement =  {
          display: 'block',
        width: '800px',
      height: '450px',
    }

        const btn_style={
            width: '150px'
        }


        return (
            <div>
              <div style={container}>
                  { this.state.error && <div id="errorMsg">Error Message: {this.state.errorMessage}</div>}
                  {  <video autoPlay={true}  ref={video => this.video =video} id="videoElement"style={videoElement}>
                     </video>
                  }
                  <div>
                      {  !this.state.load && !this.state.error && <button type='button'  style={btn_style} onClick={event => this.create(event)}>create stream</button>}
                      { this.state.load &&   <button type='button' style={btn_style} onClick={event => this.videoRelease(event)}>release stream</button>}
                  </div>

              </div>

            </div>
        );
    }
}

export default App;