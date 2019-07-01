import React from 'react';
import Webcam from './component/webcam';

const initialState = {
  loaded: false,
  pause: false,
  error: false,
  errorMessage: ''
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.webcam = new Webcam("videoElement", this.successCallback, this.errorCallback);
  }

  componentWillUnmount() {
  }

  successCallback = () => {
    console.log('got a webcam stream!!');
    this.setState(ps => ({
      ...ps,
      error: false
    }));
  };

  errorCallback = (error) => {
    console.log('error to get a webcam stream!! message: ', error);
    this.setState(ps => ({
      ...ps,
      error: true,
      errorMessage: error
    }));
  };

  releaseStream = () => {
    this.webcam && this.webcam.release();
    this.setState(ps => ({
      ...ps,
      pause: true
    }));
  };

  createStream = () => {
    this.webcam && this.webcam.create();
    this.setState(ps => ({
      ...ps,
      pause: false
    }));
  };

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        {this.state.error &&
        <div>
          Error Message: {this.state.errorMessage}
        </div>
        }
        {<video autoPlay={true} id="videoElement" style={{display: this.state.error ? 'none' : 'block', margin: 'auto', width: '800px', height: '450px'}}/>}
        {!this.state.error &&
        <div>
          {!this.state.pause &&
          <button type="button" style={{width: '150px'}} onClick={this.releaseStream}>{"release stream"}</button>}
          {this.state.pause &&
          <button type="button" style={{width: '150px'}} onClick={this.createStream}>{"create stream"}</button>}
        </div>
        }
      </div>
    );
  }
}
