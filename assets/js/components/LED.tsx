import { Color } from 'csstype';
import * as React from 'react';

// Interface for the Counter component state
interface CounterState {
    ledState: Color
}

const initialState = { ledState: "grey" }

export default class LED extends React.Component<{}, CounterState> {
    constructor(props: {}) {
        super(props)

        // Set the initial state of the component in a constructor.
        this.state = initialState
    }

    public render(): JSX.Element {
        return (
            <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="4" r="1" stroke="black" fill={this.state.ledState} onClick={this.toggleState} />
                <circle cx="10" cy="4" r="1" stroke="black" fill={this.state.ledState} onClick={this.toggleState} />
                <circle cx="15" cy="4" r="1" stroke="black" fill={this.state.ledState} onClick={this.toggleState} />
                <circle cx="20" cy="4" r="1" stroke="black" fill={this.state.ledState} onClick={this.toggleState} />
                <circle cx="25" cy="4" r="1" stroke="black" fill={this.state.ledState} onClick={this.toggleState} />
            </svg>
        )
    }
    public componentDidMount() {
        var ws = WebSocket
    }

    private toggleState = () => {
        if (this.state.ledState == "grey") {
            this.setState({ ledState: "red" })
        } else {
            this.setState({ ledState: "grey" })
        }
    }
}