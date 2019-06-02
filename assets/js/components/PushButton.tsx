import * as React from 'react';

export enum PushButtonEvent { Pressed, Released }
type PushButtonProps = { pushEventHandler: (e: PushButtonEvent, address: number, bit: number) => void, address: number, bit: number }
export default class PushButton extends React.Component<PushButtonProps, {}> {
    constructor(props: PushButtonProps) {
        super(props)
    }

    public render(): JSX.Element {
        return (
            <div className="btn-outer">
                <button className="btn-push" onMouseDown={this.mousePressed} onMouseUp={this.mouseReleased} />
            </div>
        )
    }

    private mousePressed = () => {
        this.props.pushEventHandler(PushButtonEvent.Pressed, this.props.address, this.props.bit)
    }
    private mouseReleased = () => {
        this.props.pushEventHandler(PushButtonEvent.Released, this.props.address, this.props.bit)
    }
}