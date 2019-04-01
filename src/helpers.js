var _ = require('lodash');

const API = process.env.REACT_APP_API || 'http://localhost:8081';

async function checkAuthentication() {
  const authenticated = await this.props.auth.isAuthenticated();
  if (authenticated !== this.state.authenticated) {
    if (authenticated && !this.state.userinfo) {
      const userinfo = await this.props.auth.getUser();
      this.setState({ authenticated, userinfo });
    } else {
      this.setState({ authenticated });
    }
  }
}

async function fetch(method, endpoint, body) {
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

async function getScholarships() {
  this.setState({ loading: false, saved_scholarships: await this.fetch('get', '/scholarships').bind(this) });
}

async function saveScholarship (scholarship) {
  if (scholarship.id) {
    await this.fetch('put', `/scholarships/${scholarship.id}`, scholarship).bind(this);
  } else {
    await this.fetch('post', '/scholarships', scholarship).bind(this);
  }

  // this.props.history.goBack();
  this.getScholarships();
}

async function unsaveScholarship(scholarship) {
  await this.fetch('delete', `/scholarships/${scholarship.id}`).bind(this);
  this.getScholarships();
}

/* eslint-disable import/prefer-default-export */
export { checkAuthentication, getScholarships, saveScholarship, unsaveScholarship };
