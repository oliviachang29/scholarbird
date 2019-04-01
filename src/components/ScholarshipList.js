import React, { Component } from 'react';
import Scholarship from './scholarship.js'
import { Form, Radio, Checkbox, Container, Image, Button} from 'semantic-ui-react';
var _ = require('lodash');

const deadlineFirst = ["deadline", "amount"]
const amountFirst = ["amount", "deadline"]

export default class ScholarshipList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scholarships: null,
            sortBy: deadlineFirst,
            noEssay: false,
        }
    }

    filterScholarships(data) {
        // filter gpa
        var newData = [];
        var temp;
        // if there's no requirements, don't filter
        if (this.props.formAnswers) {
            console.log(this.props.formAnswers)
            for (var i = 0; i < data.length; i++) {
              temp = data[i]

              // filter gender
              if (this.props.formAnswers.gender) {
                  if (this.props.formAnswers.gender === "Male" && temp.gender === "Female") {
                      continue;
                  }
              }

              // filter gpa
              if (this.props.formAnswers.gpa) {
                  if (temp.minimumGPA > this.props.formAnswers.gpa) {
                      continue;
                  }
              }

              // filter major
              if (this.props.formAnswers.major) {
                  if (temp.major &&
                      temp.major !== this.props.formAnswers.major &&
                      !temp.major.includes(this.props.formAnswers.major) &&
                      !this.props.formAnswers.major.includes(temp.major)) {
                      continue;
                  }
              }

              // filter age
              // if an age is specified - some have no age specification
              if (this.props.formAnswers.age) {
                  if (temp.highSchool || temp.undergraduate || temp.graduate) {
                      // if you're in high school, but it doesn't allow high school
                      if (this.props.formAnswers.age === "High School" && !temp.highSchool) {
                          continue;
                      }
                      if (this.props.formAnswers.age === "Undergraduate" && !temp.undergraduate) {
                          continue;
                      }
                      if (this.props.formAnswers.age === "Graduate" && !temp.graduate) {
                          continue;
                      }
                  }
              }

              // if we don't want essay, but essay is required
              if (this.state.noEssay && temp.essay) {
              	continue
              }

              newData.push(temp);
            }
        } else {
            newData = data
        }
        // console.log(newData)
        return _.orderBy(newData, this.state.sortBy)
    }

    render() {
        var scholarships;
        if (this.props.scholarships) {
            var sortedData = this.filterScholarships(this.props.scholarships)
            scholarships = sortedData.map((scholarship, i) =>
                <Scholarship
				          key={i}
				          scholarship={scholarship}
				          savedPage={this.props.savedPage}
				          saveScholarship={() => this.props.saveScholarship({
				            sheet_id: scholarship.id, 
				            name: scholarship.name,
				            amount: scholarship.amount,
				            contact: scholarship.contact,
				            link: scholarship.link,
				            deadline: scholarship.deadline,
				            requirements: scholarship.requirements,
				            major: scholarship.major,
				            user_email: this.props.userinfo.email
				          })}
			          	unsaveScholarship={() => this.props.unsaveScholarship(scholarship.id)}
			          	/>
            );
        }
        var emptyStateText = this.props.savedPage ? "You haven't saved any scholarships yet." : "No scholarships to display."
        var num_scholarships = scholarships ? scholarships.length : 0
        return (
          <div>
        	{!this.props.savedPage &&
        		 <div className="list-header-background results-background">
		          <Container>
		          	<p className="list-title">Results</p>
		          	<p className="list-subtitle">We found <b>{num_scholarships} scholarships</b> that match your criteria.</p>
		          </Container>
		        </div>
        	}
        	{scholarships && scholarships.length > 0 &&
        		<Container className="scholarship-list-container">
        		<div class="d-flex flex-row filter-and-sort">
        			<div className="filter-container">
	        			<p><b>Filter:</b></p>
					      <Checkbox
				        	//style={{marginLeft: 30}}
				        	label="No essay required"
				        	defaultChecked={this.state.noEssay}
				        	onChange={() => this.setState({noEssay: !this.state.noEssay})}
				        />
				      </div>
				      <div>
			        	<p className="sort-by"><b>Sort by:</b></p>
			          <Form className="d-flex flex-row">
					        <Form.Field>
					          <Radio
					            label='Deadline'
					            name='radioGroup'
					            value='Deadline'
					            checked={this.state.sortBy === deadlineFirst}
					            onChange={() => this.setState({sortBy: deadlineFirst})}
					          />
					        </Form.Field>
					        <Form.Field>
					          <Radio
					          	style={{marginLeft: 30}}
					            label='Amount'
					            name='radioGroup'
					            value='Amount'
					            checked={this.state.sortBy === amountFirst}
					            onChange={() => this.setState({sortBy: amountFirst})}
					          />
					        </Form.Field>
					      </Form>
					    </div>
			      </div>
			     </Container>
		      }
		      <Container>
		      	<div class="row">
	        		{scholarships}
	        	</div>
	        	{scholarships && scholarships.length === 0 &&
	        		<div class="d-flex flex-column align-items-center empty-state">
		        		<Image src='https://s3.amazonaws.com/github-demo-images/hiker-man-colour-1200px.png' size="large"/>
		        		<p className="empty-state-text">{emptyStateText}</p>
		        		{this.props.savedPage &&
		        			<a href="/"><Button>Browse for scholarships</Button></a>
		        		}
		        	</div>
	        	}
	        </Container>
        </div>
        );
    }
}