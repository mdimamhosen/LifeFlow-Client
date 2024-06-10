import React, { Component } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { axiosOpen } from "../Hooks/useAxiosCommon";
import { toast } from "react-hot-toast";
const Card = (props) => (
  <div className="card bg-white rounded-lg shadow-lg drop-shadow-lg overflow-hidden w-full lg:w-3/5 sm:w-4/5 p-8">
    {props.children}
  </div>
);

const Form = (props) => (
  <form className="form" onSubmit={props.onSubmit}>
    {props.children}
  </form>
);

const TextInput = (props) => (
  <div className="text-input relative mb-4">
    <label
      className={`absolute top-2 left-2 px-1 pointer-events-none transition duration-150 ${
        props.focus || props.value !== ""
          ? "text-red-500 font-semibold transform -translate-y-1/2 bg-white"
          : "text-gray-600"
      }`}
      htmlFor={props.name}
    >
      {props.label}
    </label>
    <input
      className={`block w-full border border-gray-300 rounded-md py-2 px-4 transition duration-150 ${
        props.focus || props.value !== ""
          ? "border-red-500 focus:border-red-500"
          : ""
      }`}
      type="text"
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    />
  </div>
);

const TextArea = (props) => (
  <div className="text-area relative mb-4">
    <label
      className={`absolute top-2 left-2 px-1 pointer-events-none transition duration-150 ${
        props.focus || props.value !== ""
          ? "text-red-500 font-semibold transform -translate-y-1/2 bg-white"
          : "text-gray-600"
      }`}
      htmlFor={props.name}
    >
      {props.label}
    </label>
    <textarea
      className={`block w-full border border-gray-300 rounded-md py-2 px-4 transition duration-150 h-32 ${
        props.focus || props.value !== ""
          ? "border-red-500 focus:border-red-500"
          : ""
      }`}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    />
  </div>
);

const Button = (props) => (
  <button
    className="block w-full bg-red-600 hover:bg-red-700 transition-all duration-300 ease-linear border-none rounded py-2 text-white font-semibold"
    type="submit"
  >
    {props.children}
  </button>
);

const ContactInfo = () => (
  <div className="contact-info mt-8">
    <div className="flex items-center mb-4">
      <FaEnvelope className="text-red-500 mr-2" />
      <span>admin@example.com</span>
    </div>
    <div className="flex items-center mb-4">
      <FaPhone className="text-red-500 mr-2" />
      <span>+1 (234) 567-8901</span>
    </div>
    <div className="flex items-center">
      <FaMapMarkerAlt className="text-red-500 mr-2" />
      <span>123 Main Street, Bottola, Barishla</span>
    </div>
  </div>
);

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        name: "name",
        label: "Name",
        value: "",
        focus: false,
      },
      email: {
        name: "email",
        label: "Email",
        value: "",
        focus: false,
      },
      message: {
        name: "message",
        label: "Message",
        value: "",
        focus: false,
      },
    };
  }

  handleFocus = (e) => {
    const name = e.target.name;
    this.setState((prevState) => ({
      [name]: { ...prevState[name], focus: true },
    }));
  };

  handleBlur = (e) => {
    const name = e.target.name;
    this.setState((prevState) => ({
      [name]: { ...prevState[name], focus: false },
    }));
  };

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => ({
      [name]: { ...prevState[name], value: value },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = this.state;
    const formData = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    axiosOpen
      .post("/contact", formData)
      .then((res) => {
        console.log(res);
        toast.success("Message sent successfully!");
        this.setState({
          name: { ...this.state.name, value: "" },
          email: { ...this.state.email, value: "" },
          message: { ...this.state.message, value: "" },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    const { name, email, message } = this.state;
    return (
      <div className="container flex items-center justify-center px-2 md:px-0 mx-auto mb-8">
        <Card>
          <h1 className="text-xl font-semibold mb-8">Contact With Us!</h1>
          <Form onSubmit={this.handleSubmit}>
            <TextInput
              {...name}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            <TextInput
              {...email}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            <TextArea
              {...message}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            <Button>Send</Button>
          </Form>
          <ContactInfo />
        </Card>
      </div>
    );
  }
}

export default ContactUs;
