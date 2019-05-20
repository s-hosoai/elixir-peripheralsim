import { Color } from 'csstype';
import { Socket } from 'phoenix';
import * as React from 'react';

import LED from '../components/LED';
import Main from '../components/Main';

// Interface for the Counter component state
interface CounterState {
    // currentCount: number
    ledColor: Color
    ledState1: Boolean
    ledState2: Boolean
    ledState3: Boolean
    ledState4: Boolean
    ws: any
}

const initialState = { ledColor: "grey", ledState1: false, ledState2: false, ledState3: false, ledState4: false, ws: null }

export default class FilePage extends React.Component<{}, CounterState> {
    constructor(props: {}) {
        super(props)

        // Set the initial state of the component in a constructor.
        this.state = initialState
    }

    public componentDidMount() {
        var socket = new Socket("/socket", {})
        socket.connect()
        var channel = socket.channel("file:update", {})
        channel.join()
            .receive("ok", resp => { })

        channel.on("data", resp => {
            if (resp.data.charCodeAt().toString(2) == "1") {
                this.setState({ ledState1: true })
            } else {
                this.setState({ ledState1: false })
            }
            console.log(resp.data.charCodeAt().toString(2))
        })
        this.setState({ ws: channel })
    }

    public render(): JSX.Element {
        return (
            <Main>
                <LED led={this.state.ledState1} />
                <LED led={this.state.ledState2} />
                <LED led={this.state.ledState3} />
                <LED led={this.state.ledState4} />
                <button onClick={this.push}></button>
            </Main>
        )
    }

    private push = () => {
        this.state.ws.push("button", "hello?")
    }
}