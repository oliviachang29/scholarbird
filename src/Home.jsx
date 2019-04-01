/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { checkAuthentication } from './helpers';
import ScholarshipList from './components/ScholarshipList.js'
import Intro from './components/Intro.js'
import InfoForm from './components/InfoForm.js'

const sheety_link = "https://api.sheety.co/c8bcc89a-5bce-42f7-ae85-8bc44b979f3c";
const API = process.env.REACT_APP_API || 'http://localhost:8081';

export default withAuth(class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: null,
            userinfo: null,
            showScholarships: false
        };
        this.checkAuthentication = checkAuthentication.bind(this);
        // this.saveScholarship = saveScholarship.bind(this);
        this.login = this.login.bind(this);
    }

    async componentDidMount() {
        this.checkAuthentication();
        // if (this.state.authenticated) {
        fetch(sheety_link)
            .then(response => response.json())
            .then(data => {
                this.setState({ data });
            });
        // }
    }

    async fetch(method, endpoint, body) {
        try {
            const response = await fetch(`${API}${endpoint}`, {
                method,
                body: body && JSON.stringify(body),
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json',
                    authorization: `Bearer ${await this.props.auth.getAccessToken()}`,
                },
            });
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async saveScholarship(scholarship) {
        if (scholarship.id) {
            await this.fetch('put', `/scholarships/${scholarship.id}`, scholarship);
        } else {
            await this.fetch('post', '/scholarships', scholarship);
        }
    }

    async unsaveScholarship(id) {
        await this.fetch('delete', `/scholarships/${id}`);
    }

    async componentDidUpdate() {
        this.checkAuthentication();
    }

    async login() {
        this.props.auth.login('/');
    }

    submitForm(formAnswers) {
      this.setState({formAnswers, showScholarships: true})
    }

    render() {
      if (this.state.authenticated !== null && this.state.authenticated === true) {
        return (
          <div>
            {this.state.showScholarships?
              <div>
                <ScholarshipList
                  formAnswers={this.state.formAnswers}
                  scholarships={this.state.data}
                  userinfo={this.state.userinfo}
                  saveScholarship={(scholarship) => this.saveScholarship(scholarship)}
                  unsaveScholarship={(id) => this.unsaveScholarship(id)}/>
              </div>
            :  
              <InfoForm
                submit={(formAnswers) => this.submitForm(formAnswers)}
              />
            }
          </div>
        )
      } else if (this.state.authenticated === false) {
        return <Intro login={this.login} />
      } else {
        return <div></div>
      }
    }
});