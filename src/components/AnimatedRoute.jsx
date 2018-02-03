import { Route } from "react-router-dom";
import React, { Component } from 'react';

export default class AnimatedRoute extends Component {
    constructor(){
        super()
        this.state={FadeOut: false}
    }
    FadeOut(){
        this.setState({FadeOut: true})
        setTimeout(()=>{
            this.setState({FadeOut: false})
        },this.props.delay)
    }
    render() {
        const props = Object.assign({}, this.props);
        let Comp = props.component
        delete props.component;
        delete props.delay;

        return (
            <Route {...props} render={(props) => {
                return( <Comp LoadingClassName={this.state.FadeOut ? "Loading":""} FadeOut={this.FadeOut.bind(this)} AnimatedDelay={this.props.delay}/>)
            }} />
        );
    }
}
