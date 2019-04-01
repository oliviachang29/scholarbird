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
import { Container, Button, Header, Icon } from 'semantic-ui-react';
import { checkAuthentication } from './helpers';
import ScholarshipList from './components/ScholarshipList.js'

const API = process.env.REACT_APP_API || 'http://localhost:8081';

export default withAuth(class Saved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null,
      userinfo: null,
      scholarships: null
    };
    this.checkAuthentication = checkAuthentication.bind(this);
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

  async getScholarships () {
    this.setState({ loading: false, saved_scholarships: await this.fetch('get', '/scholarships?email=' + this.state.userinfo.email) });
  }

  async saveScholarship (scholarship) {
    if (scholarship.id) {
      await this.fetch('put', `/scholarships/${scholarship.id}`, scholarship);
    } else {
      await this.fetch('post', '/scholarships', scholarship);
    }

    // this.props.history.goBack();
    this.getScholarships();
  }

  async unsaveScholarship(id) {
    await this.fetch('delete', `/scholarships/${id}`);
    this.getScholarships();
  }

  async componentDidMount() {
    await this.checkAuthentication();
    this.getScholarships();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }


  render() {
    return (
      <div>
        {this.state.saved_scholarships && this.state.saved_scholarships.length > 0 && 
          <div className="list-header-background saved-background">
            <Container>
              <p className="list-title">Saved scholarships</p>
              <p className="list-subtitle">You have <b>{this.state.saved_scholarships.length} scholarships</b> saved.</p>
            </Container>
          </div>
        }
        <Container className="scholarship-list-container">
          <ScholarshipList
            scholarships={this.state.saved_scholarships}
            savedPage
            userinfo={this.state.userinfo}
            saveScholarship={(scholarship) => this.saveScholarship(scholarship)}
            unsaveScholarship={(id) => this.unsaveScholarship(id)}/>
        </Container>
      </div>
    );
  }
});
