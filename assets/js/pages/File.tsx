import { Color } from 'csstype';
import { Socket } from 'phoenix';
import * as React from 'react';

import Main from '../components/Main';

// Interface for the Counter component state
interface CounterState {
    // currentCount: number
    ledColor: Color
    ws: any
}

const initialState = { ledColor: "grey", ws: null }

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

        channel.on("lines", resp => {
            if (this.state.ledColor == "grey") {
                this.setState({ ledColor: "red" })
            } else if (this.state.ledColor == "red") {
                this.setState({ ledColor: "blue" })
            } else {
                this.setState({ ledColor: "grey" })
            }
        })
        this.setState({ ws: channel })
    }

    public render(): JSX.Element {
        return (
            <Main>
                <svg>
                    <circle cx="10" cy="10" r="10" fill={this.state.ledColor}></circle>
                </svg>
                <button onClick={this.push}></button>
            </Main>
        )
    }

    private push = () => {
        this.state.ws.push("button", "hello?")
    }
}