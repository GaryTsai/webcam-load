import React, {Component} from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            errorMessage:''
        }
    }
    create =(e)=>
    {

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: true})
                .then(function (stream) {
                    this.video.srcObject = stream;
                    this.setState({
                        videoStream: stream.active
                    })
                })
                .catch(function (err0r) {
                    console.log(err0r);
                    console.log("Something went wrong!");
                });
        }
    }
    release =(e)=> {
        let stream = this.video.srcObject;
        let tracks = stream.getTracks();

        for (let i = 0; i < tracks.length; i++) {
            let track = tracks[i];
            track.stop();
        }
        this.video.srcObject = null;
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
      backgroundColor: '#666'
    }

        const btn_style={
            width: '150px'
        }


        return (
            <div>
              <div style={container}>

                <video autoPlay={true} ref={video => this.video =video} id="videoElement"style={videoElement}>

                </video>
                  <div>
                  { !this.state.videoStream  &&
                  <button type='button'  style={btn_style} onClick={event => this.create(event)}>create stream</button>}
                  { this.state.videoStream &&
                  <button type='button' style={btn_style} onClick={event => this.release(event)}>release stream</button>}
                  </div>

              </div>
                <div>{this.state.videoStream.toString() }123 </div>

            </div>
        );
    }
}

export default App;