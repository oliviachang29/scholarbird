import React, { Component } from 'react'
import { Form, Header, Container } from 'semantic-ui-react'

const major_options = [
	{key: 'Undecided', text: 'Undecided', value: 'Undecided'},
	{key: 'Accounting', text: 'Accounting', value: 'Accounting'},
	{key: 'Aerospace', text: 'Aerospace', value: 'Aerospace'},
	{key: 'Agriculture', text: 'Agriculture', value: 'Agriculture'},
	{key: 'Aviation', text: 'Aviation', value: 'Aviation'},
	{key: 'Banking', text: 'Banking', value: 'Banking'},
	{key: 'Business', text: 'Business', value: 'Business'},
	{key: 'Chemical Engineering', text: 'Chemical Engineering', value: 'Chemical Engineering'},
	{key: 'Civil Engineering', text: 'Civil Engineering', value: 'Civil Engineering'},
	{key: 'Computer Engineering', text: 'Computer Engineering', value: 'Computer Engineering'},
	{key: 'Computer Science', text: 'Computer Science', value: 'Computer Science'},
	{key: 'Construction', text: 'Construction', value: 'Construction'},
	{key: 'Cosmetology or Barbering', text: 'Cosmetology or Barbering', value: 'Cosmetology or Barbering'},
	{key: 'Economics', text: 'Economics', value: 'Economics'},
	{key: 'Electrical Engineering', text: 'Electrical Engineering', value: 'Electrical Engineering'},
	{key: 'Finance', text: 'Finance', value: 'Finance'},
	{key: 'Healthcare', text: 'Healthcare', value: 'Healthcare'},
	{key: 'Human Resources', text: 'Human Resources', value: 'Human Resources'},
	{key: 'Industrial Engineer', text: 'Industrial Engineer', value: 'Industrial Engineer'},
	{key: 'Journalism, Public Relations', text: 'Journalism, Public Relations', value: 'Journalism, Public Relations'},
	{key: 'Law', text: 'Law', value: 'Law'},
	{key: 'Nuclear Science', text: 'Nuclear Science', value: 'Nuclear Science'},
	{key: 'Optics', text: 'Optics', value: 'Optics'},
	{key: 'Philosophy', text: 'Philosophy', value: 'Philosophy'},
	{key: 'Political Science', text: 'Political Science', value: 'Political Science'},
	{key: 'Respiratory Care', text: 'Respiratory Care', value: 'Respiratory Care'},
	{key: 'Retail', text: 'Retail', value: 'Retail'},
	{key: 'Sociology', text: 'Sociology', value: 'Sociology'},
	{key: 'STEM', text: 'STEM', value: 'STEM'},
	{key: 'Teaching or Education', text: 'Teaching or Education', value: 'Teaching or Education'},
	{key: 'Welding Engineering', text: 'Welding Engineering', value: 'Welding Engineering'},
	{key: 'Writing', text: 'Writing', value: 'Writing'},
]

const gender_options = [
  { key: 'Male', text: 'Male', value: 'Male' },
  { key: 'Female', text: 'Female', value: 'Female' },
  { key: 'Other', text: 'Other', value: 'Other' },
]

const age_options = [
  { key: 'High School', text: 'High School', value: 'High School' },
  { key: 'Undergraduate', text: 'Undergraduate', value: 'Undergraduate' },
  { key: 'Graduate', text: 'Graduate', value: 'Graduate' },
]

export default class InfoForm extends Component {
  state = {
  	gender: "",
  	gpa: "",
  	age: "",
  	major: "",
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    this.props.submit(this.state)
  }

  // handle change for all
  render() {
  	const { gender, gpa, age, major } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
	      <div className="list-header-background form-background">
	        <Container>
	        	<p className="list-title">Tell us about you.</p>
	        </Container>
	      </div>
	      <Container className="main-container">
					<Form.Select
						fluid 
						label='Gender'
						options={gender_options}
						placeholder='Select one'
						onChange={(e, { value }) => this.setState({gender: value})}
						value={this.state.gender}
					/>
					<Form.Input fluid
						label="GPA"
						placeholder='Out of 4.0'
						onChange={(e, { value }) => this.setState({gpa: value})}
						value={this.state.gpa}
					/>
					<Form.Select fluid
						label='Current level of education'
						options={age_options} 
						placeholder='Select one'
						onChange={(e, { value }) => this.setState({age: value})}
						value={this.state.age}
						/>
					<Form.Select fluid
						search
						label='Current or intended field of study' 
						options={major_options}
						placeholder='Select one'
						onChange={(e, { value }) => this.setState({major: value})}
						value={this.state.major}
					/>
					<Form.Button class="info-form-button">Submit</Form.Button>
				</Container>
      </Form>
    )
  }
}