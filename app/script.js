import React from 'react';
import { render } from 'react-dom';
// import AppDescription from './components/AppDescription/AppDescription';

class App extends React.Component {

  state = {
    status: 'off',
    time: 0,
    timer: null,
  }

  formatTime (totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds - (minutes * 60));

    const output = `${(minutes < 10? `0${minutes}` : minutes)}:${(seconds < 10? `0${seconds}` : seconds)}`;
    return output;
  }

  step () {
    this.setState({ time: this.state.time - 1});
    this.state.time === 0? (
      this.setState ({
        status: this.state.status === 'work'? 'rest' : 'work',
        time: this.state.status === 'work'? 20 : 1200,
      })) : '';
  }

  startTimer = () => {
    this.setState({
      status: 'work',
      time: 1200,
      timer: setInterval(() => this.step(), 1000)
    });
  }

  render() {
    return (
      <div>
        <h1>Protect your eyes</h1>
        {this.state.status == 'off'? (
        <section>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
          <button className="btn" onClick={this.startTimer}>Start</button>
        </section>
        ): ''}
        
        {this.state.status == 'work'? (
          <img src="./images/work.png" />
        ) : ''}
        {this.state.status == 'rest'? (
          <img src="./images/rest.png" />
        ) : ''}
 
         {this.state.status !== 'off'? (
           <section>
            <div className="timer">
              {this.formatTime(this.state.time)}
            </div>
            <button className="btn">Stop</button>
           </section>
         ) : ''} 
        <button className="btn btn-close">X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
