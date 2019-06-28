import React, {Component} from 'react';
const constraints = {
    audio: false,
    video: true
};
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            errorMessage:''
        }


    }

    // handleOpen=(stream)=>{
    //     const videoTracks = stream.getVideoTracks();
    //     console.log('Got stream with constraints:', constraints);
    //     console.log(`Using video device: ${videoTracks[0].label}`);
    //     window.stream = stream; // make variable available to browser console
    //     this.video.srcObject = stream;
    // }
    // handleError=(error)=>{
    //     if (error.name === 'ConstraintNotSatisfiedError') {
    //         let v = constraints.video;
    //         this.errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
    //     } else if (error.name === 'PermissionDeniedError') {
    //         this.rrorMsg('Permissions have not been granted to use your camera and ' +
    //             'microphone, you need to allow the page access to your devices in ' +
    //             'order for the demo to work.');
    //     }
    //     this.errorMsg(`getUserMedia error: ${error.name}`, error);
    // }
    create =(e)=>
    {

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(constraints)
                .then(function (stream) {
                    const video = document.querySelector('videoElement');
                    const videoTracks = stream.getVideoTracks();
                        console.log('Got stream with constraints:', constraints);
                        console.log(`Using video device: ${videoTracks[0].label}`);
                        window.stream = stream; // make variable available to browser console
                        video.srcObject = stream;
                    // this.video.srcObject = stream;
                    // this.setState({
                    //     videoStream: stream.active
                    // })
                })
                .catch(function (err0r) {
                    console.log(err0r);
                        // if (error.name === 'ConstraintNotSatisfiedError') {
                        //     let v = constraints.video;
                        //
                        //     errMessage =`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`
                        // } else if (error.name === 'PermissionDeniedError') {
                        //     this.rrorMsg('Permissions have not been granted to use your camera and ' +
                        //         'microphone, you need to allow the page access to your devices in ' +
                        //         'order for the demo to work.');
                        // }
                        // errorMsg(`getUserMedia error: ${error.name}`, error);
                    // this.setState({
                    //     errorMessage: "Some thing wrong"
                    // })

                });

        }

    }
    // errorMsg=(msg, error)=> {
    //     const errorElement = document.querySelector('#errorMsg');
    //     errorElement.innerHTML += `<p>${msg}</p>`;
    //     if (typeof error !== 'undefined') {
    //         console.error(error);
    //     }
    // }
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

                  { !this.state.errorMessage &&<video autoPlay={true} ref={video => this.video =video} id="videoElement"style={videoElement}>
                     </video>
                  }
                  <div>
                  { !this.state.load  &&
                  <button type='button'  style={btn_style} onClick={event => this.create(event)}>create stream</button>}
                  { this.state.load &&
                  <button type='button' style={btn_style} onClick={event => this.release(event)}>release stream</button>}
                  </div>

              </div>

            </div>
        );
    }
}

export default App;