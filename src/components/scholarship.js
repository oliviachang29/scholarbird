import React, { Component } from 'react';
import { Icon, Header, Form } from 'semantic-ui-react';

export default class Scholarship extends Component {
	constructor(props) {
		super(props);
		this.state = {
			saved: this.props.savedPage ? true : false,
			showDescription: false
		}
	}

	save() {
		this.props.saveScholarship()
		console.log('saving')
		this.toggleSaved()
	}

	unsave() {
		this.props.unsaveScholarship()
		console.log('unsaving')
		this.toggleSaved()
	}

	toggleSaved() {
		this.setState({saved: !this.state.saved})
	}

	render() {
		return (
			<div className="col-md-6">
				<div className="card d-flex flex-column" style={{padding: 30, marginTop: 15, marginBottom: 15}}>
					<div className="d-flex flex-row justify-content-space-between">
						<Header as="h3" className="scholarship-name card-title">{this.props.scholarship.name}</Header>
					</div>
					<p className="card-text"><b>Amount:</b> {this.props.scholarship.amount}</p>
					<p className="card-text"><b>Deadline:</b> {this.props.scholarship.deadline}</p>
					{this.props.scholarship.minimumGPA &&
						<p className="card-text"><b>Minimum GPA:</b> {this.props.scholarship.minimumGPA}</p>
					}
					{this.props.scholarship.major &&
						<p className="card-text"><b>Major:</b> {this.props.scholarship.major}</p>
					}
					<p className="see-more-text" onClick={() => this.setState({showDescription: !this.state.showDescription})}>
						> {this.state.showDescription ? "Hide requirements" : "Show requirements"}
					</p>
					{/*<p className="card-text"><b>Contact:</b> {this.props.scholarship.contact}</p>*/}
					{this.state.showDescription &&
						<p className="scholarship-description">Requirements: {this.props.scholarship.requirements}</p>
					}
					<div className="d-flex flex-row justify-content-between card-bottom-container">
						<a href={this.props.scholarship.link} target="_"><Form.Button>Open link</Form.Button></a>
						{this.state.saved ?
							<Icon name="heart" onClick={() => this.unsave()} />
							:
							<Icon name="heart outline" onClick={() => this.save()} />
						}
					</div>
				</div>
			</div>
		)
	}
}