import './Phonebook.css';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
export class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmit = newContact => {
    console.log(newContact);
    const { contacts } = this.state;
    const { name, number } = newContact;
    const contact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (contact) {
      this.showMessage(`Contact ${name} already exists`);
      return;
    }
    return this.setState({
      contacts: [...contacts, { name: name, number: number, id: nanoid() }],
    });
  };

  handleChangeFilterByName = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  getFIlteredContacts = () => {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  showMessage(message) {
    Notify.warning(message);
  }

  onDeleteContact = contact => {
    const { contacts } = this.state;
    this.setState({
      contacts: contacts.filter(c => {
        return c.id !== contact.id;
      }),
    });
  };

  render() {
    const renderList = this.getFIlteredContacts();
    return (
      <div className="phonebook_box">
        <h2>Phonebook</h2>
        <ContactForm handleSubmit={this.handleSubmit} />
        <div className="phonebook__contacts">
          <h2>Contacts</h2>
          <Filter
            filter={this.state.filter}
            handleChangeFilterByName={this.handleChangeFilterByName}
          />
          <ContactList
            renderList={renderList}
            onDeleteContact={this.onDeleteContact}
          />
        </div>
      </div>
    );
  }
}
