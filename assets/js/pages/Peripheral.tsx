import { Channel, Socket } from 'phoenix';
import * as React from 'react';

import LED from '../components/LED';
import Main from '../components/Main';
import PushButton, { PushButtonEvent } from '../components/PushButton';

interface CounterState {
    memoryMap: number[]
    ws: Channel | null
}

const initialState = { memoryMap: [], ws: null }

export default class PeripheralPage extends React.Component<{ memorySize: number }, CounterState> {
    constructor(props: { memorySize: number }) {
        super(props)
        if (this.props.memorySize == null || this.props.memorySize == 0) {
            this.state = { memoryMap: new Array<number>(16).fill(0), ws: null }
        } else {
            this.state = { memoryMap: new Array<number>(this.props.memorySize).fill(0), ws: null }
        }
    }

    public componentDidMount() {
        var socket = new Socket("/socket", {})
        socket.connect()
        var channel = socket.channel("file:update", {})
        channel.join()
            .receive("ok", resp => { })

        channel.on("data", resp => {
            var temporalMap = this.state.memoryMap
            for (var i = 0; i < resp.data.length; i += 2) {
                temporalMap[i] = parseInt(resp.data.substr(i, 2), 16)
                // console.log(temporalMap[i].toString(2))
            }
            this.setState({ memoryMap: temporalMap })
        })
        this.setState({ ws: channel })
    }

    public render(): JSX.Element {
        return (
            <Main>
                <LED led={this.getBit(0x00, 0)} />
                <LED led={this.getBit(0x00, 1)} />
                <LED led={this.getBit(0x00, 2)} />
                <LED led={this.getBit(0x00, 3)} />
                <LED led={this.getBit(0x00, 4)} />
                <LED led={this.getBit(0x00, 5)} />
                <LED led={this.getBit(0x00, 6)} />
                <LED led={this.getBit(0x00, 7)} />
                <LED led={this.getBit(0x00, 8)} />
                <LED led={this.getBit(0x00, 9)} />
                <LED led={this.getBit(0x00, 10)} />
                <LED led={this.getBit(0x00, 11)} />
                <LED led={this.getBit(0x00, 12)} />
                <LED led={this.getBit(0x00, 13)} />
                <LED led={this.getBit(0x00, 14)} />
                <LED led={this.getBit(0x00, 15)} />
                <PushButton pushEventHandler={this.pushButton} address={0x00} bit={0} />
                <PushButton pushEventHandler={this.pushButton} address={0x00} bit={1} />
                <PushButton pushEventHandler={this.pushButton} address={0x00} bit={2} />
                <PushButton pushEventHandler={this.pushButton} address={0x00} bit={3} />
                <PushButton pushEventHandler={this.pushButton} address={0x00} bit={4} />
                <PushButton pushEventHandler={this.pushButton} address={0x00} bit={5} />
            </Main>
        )
    }
    private getBit = (address: number, bit: number) => {
        return this.state.memoryMap[address].toString(2).padStart(16, "0")[bit] == '1'
    }

    private pushButton = (event: PushButtonEvent, address: number, bit: number) => {
        if (this.state.ws != null) {
            if (event == PushButtonEvent.Pressed) {
                this.state.ws.push("updateBit", { address: address, bit: bit, value: 1 })
            } else {
                this.state.ws.push("updateBit", { address: address, bit: bit, value: 0 })
            }
        }
    }
}