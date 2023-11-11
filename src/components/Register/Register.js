import React from "react";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resgisterName: "",
            registerEmail: "",
            resgisterPassword: "",
        }
    }

    onNameChange = (event) => {
        this.setState({ resgisterName: event.target.value })
    }

    onEmailChange = (event) => {
        this.setState({ registerEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ resgisterPassword: event.target.value })
    }

    onSubmitRegister = () => {
        fetch("https://smart-brain-backend-kbea.onrender.com/register", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: this.state.resgisterName,
                email: this.state.registerEmail,
                password: this.state.resgisterPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange("Home")
                }
            })

    }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onNameChange}
                                    type="text"
                                    name="name"
                                    value={this.state.resgisterName}
                                    id="name" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onEmailChange}
                                    type="email"
                                    name="email-address"
                                    value={this.state.registerEmail}
                                    id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onPasswordChange}
                                    type="password"
                                    name="password"
                                    value={this.state.resgisterPassword}
                                    id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitRegister}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register" />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Register;