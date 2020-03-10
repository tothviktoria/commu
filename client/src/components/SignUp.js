import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import axios from "axios";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      email: "",
      password: "",
      selectedId: 0,
      users: [],
      areas: []
    };
  }

  handleEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleName = e => {
    this.setState({
      full_name: e.target.value
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push("/signIn");
  }

  getAreaId = e => {
    this.setState({
      selectedId: e.target.value
    });
  };

  addUser = () => {
    axios("/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      data: {
        full_name: this.state.full_name,
        email: this.state.email,
        password: this.state.password,
        area_id: this.state.selectedId
      }
    })
      .then(results => {
        this.setState({
          users: results
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    axios("/areas")
      .then(results => {
        console.log(results);
        this.setState({
          areas: [...this.state.areas, ...results.data]
        });
        // console.log("this is where we are checking", this.state.areas[0].id);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>Create account</h1>
        <form>
          <div class="form-group">
            <label for="exampleFormControlInput1">Full name</label>
            <input
              onChange={e => this.handleName(e)}
              value={this.state.full_name}
              type="name"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="John Johnny"
            />
            <label for="exampleFormControlInput1">Email address</label>
            <input
              onChange={this.handleEmail}
              value={this.state.email}
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
            <label for="exampleFormControlInput1">Password</label>
            <input
              onChange={this.handlePassword}
              value={this.state.password}
              type="password"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="******"
            />
          </div>
          <div class="form-group">
           
            {/* <button
            type="button"
            class="btn btn-dark"
            onClick={this.addUser}
          >
            Join
          </button> */}
          </div>

          {/* <!-- Button trigger modal --> */}

          <button
            type="button"
            class="btn btn-dark"
            data-toggle="modal"
            data-target="#staticBackdrop"
            onClick={this.addUser}
          >
            Join
          </button>

          {/* <!-- Modal --> */}
          <div
            class="modal fade"
            id="staticBackdrop"
            data-backdrop="static"
            tabindex="-1"
            role="dialog"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    Wohoo, you're part of Commu!
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                {/* <Link to="/signIn"> */}
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={e => this.handleSubmit(e)}
                >
                  Login
                </button>
                {/* Login
                  </Link> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
