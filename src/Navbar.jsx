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
import { Container, Icon, Menu, Image } from 'semantic-ui-react';
import { checkAuthentication } from './helpers';

export default withAuth(class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/');
  }

  async logout() {
    this.props.auth.logout('/');
  }

  render() {
    return (
      <div>
        {this.state.authenticated && 
          <Menu fixed="top">
              <Menu.Item className="nav-item" as="a" header href="/">Scholarbird</Menu.Item>
              <Menu.Menu position='right'>
                <Menu.Item className="nav-item" as="a" href="/"><Icon name="search outline" />Discover</Menu.Item>
                <Menu.Item className="nav-item" as="a" href="/saved"><Icon name="heart outline" />Saved</Menu.Item>
                <Menu.Item className="nav-item" as="a" onClick={this.logout}>Logout</Menu.Item>
              </Menu.Menu>
          </Menu>
        }
      </div>
    );
  }
});
