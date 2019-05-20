import * as React from 'react';

// Interface for the Counter component state

export default class LED extends React.Component<{ led: Boolean }, {}> {
    constructor(led: Boolean) {
        super({ led: led })
    }

    public render(): JSX.Element {
        return (
            <div className={this.props.led ? "led led-on" : "led led-off"} />
        )
    }
}