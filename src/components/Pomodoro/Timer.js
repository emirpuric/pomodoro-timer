import React, { Component } from 'react'
import './Timer.css'

class Timer extends Component {
    constructor() {
        super();

        this.state = {
            alert: {
                type: '',
                message: ''
            },
            time: 0
        };

        this.times = {
            defaultTime: 1500, // 25 min
            shortBreak: 300, // 5 min
            longBreak: 900 // 15 min
        }
    }

    componentDidMount() {
        this.setDefaultTime();
    }

    setDefaultTime = () => {
        this.setState({
            time: this.times.defaultTime
        });
    }

    setTime = newTime => {
        this.restartInterval();

        this.setState({
            time: newTime
        });
    }

    restartInterval = () => {
        const ONE_SECOND = 1000;
        
        clearInterval(this.interval);
        this.interval = setInterval(this.countDown, ONE_SECOND);
    }

    countDown = () => {
        if (this.state.time === 0) {
            this.setState({
                alert: {
                    type: 'buz',
                    message: 'Buzzzzzzzz!'
                }
            })
        } else {
            this.setState({
                time: this.state.time - 1
            });
        }
    }

    setTimeForWork = () => {
        this.setState({
            alert: {
                type: 'work',
                message: 'Working!'
            }
        });

        return this.setTime(this.times.defaultTime);
    }

    setTimeForShortBreak = () => {
        this.setState({
            alert: {
                type: 'shortBreak',
                message: 'Taking a Short Break!'
            }
        });

        return this.setTime(this.times.shortBreak);
    }

    setTimeForLongBreak = () => {
        this.setState({
            alert: {
                type: 'longBreak',
                message: 'Taking a Long Break!'
            }
        });

        return this.setTime(this.times.longBreak);
    }

    displayTimer = seconds => {
        // Formatting the time into mm:ss
        const h = seconds % 3600
        const m = Math.floor(h / 60);
        const s = Math.floor(h % 60);

        const prefixM = m < 10 ? '0' : '';
        const prefixS = s < 10 ? '0' : '';

        return `${prefixM}${m}:${prefixS}${s}`;
    }

    render() {
        const { alert: { type, message }, time } = this.state;

        return (
            <div className="Pomodoro">
              <div className={`alert ${type}`}>
                {message}
              </div>
              
              <div className="timer">
                  {this.displayTimer(time)}
              </div>

              <div className="types">
                   <button
                    className="start"
                    onClick={this.setTimeForWork}>
                        Start Working
                   </button>

                   <button
                     className="short"
                     onClick={this.setTimeForShortBreak}>
                         Short Break
                   </button>

                   <button
                     className="long"
                     onClick={this.setTimeForLongBreak}>
                         Long Break
                    </button>
              </div>
            </div>
        );
    }
}

export default Timer;