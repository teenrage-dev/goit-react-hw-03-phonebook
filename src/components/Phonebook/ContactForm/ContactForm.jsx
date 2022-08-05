import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Phonebook.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  handleChange = event => {
    const { name, value } = event.target;
    console.dir(event.target);
    this.setState({
      [name]: value,
    });
  };

  validateForm = (event, callback) => {
    event.preventDefault();
    const { name, number } = this.state;

    if (!name || !number) {
      this.showMessage('Please fill in all fields');
    }
    const contact = callback({ name, number });

    if (!contact) {
      this.setState({
        name: '',
        number: '',
      });
    }
  };

  render() {
    const { name, number } = this.state;
    const { handleSubmit } = this.props;
    return (
      <form
        onSubmit={event => {
          this.validateForm(event, handleSubmit);
        }}
        className="phonebook__form"
      >
        <label htmlFor="name" className="phonebook_name">
          Name
        </label>
        <input
          className="phonebook__input"
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor="number" className="phonebook_name">
          Number
        </label>
        <input
          className="phonebook__input"
          type="tel"
          name="number"
          value={number}
          onChange={this.handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit" className="phonebook_btn">
          Add contact
        </button>
      </form>
    );
  }
}
