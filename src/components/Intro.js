import React, { Component } from 'react';
import { Header, Button, Image } from 'semantic-ui-react';

export default class Scholarship extends Component {

    render() {
        return (
            <div className="background">
				<div className="hero">
					<div className="row">
						<div className="col-md-8">
							
							<Image className="logo" size="mini" src="https://s3.amazonaws.com/github-demo-images/scholarbird_logo.png" />
							<p>Scholarships are the best way to make college affordable. But it can be hard to find scholarships that are right for you.</p>
							<p>Introducing <b>Scholarbird</b>, a scholarship search tool that doesn't suck. Scholarbird helps you sift through thousands of dollars in scholarship money.</p>
							<p>They're just waiting to be discovered.</p>
							<Button id="login-button" primary onClick={() => this.props.login()}>Get Started</Button>
						</div>
						<div className="col-md-4">
							<Image src='https://s3.amazonaws.com/github-demo-images/scholarbird-comp.png' size="massive"/>
						</div>
					</div>
				</div>
			</div>
        )
    }
}