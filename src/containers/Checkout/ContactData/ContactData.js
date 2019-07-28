// @flow
import React, { Component } from 'react';
import type { History } from 'react-router';
import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import type { Ingredients } from '../../../types/TypeIngredients';
import axios from '../../../axios-orders';

type Address = {
  street: string,
  postalCode: string,
};

type State = {
  name: string,
  email: string,
  address: Address,
  loading: boolean,
};

type DefaultProps = {|
  ingredients: ?Ingredients,
  totalPrice: ?number,
|};

type Props = {
  ingredients?: Ingredients,
  totalPrice?: number,
  history: History,
};

class ContactData extends Component<Props, State> {
  static defaultProps: DefaultProps = {
    ingredients: null,
    totalPrice: 0,
  };

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = () => {
    this.setState({ loading: true });
    const { ingredients, totalPrice, history } = this.props;
    const order = {
      ingredients,
      price: totalPrice,
      customer: {
        name: 'Max Schwarzmüller',
        address: {
          street: 'Teststreet 1',
          zipCode: '41351',
          country: 'Germany',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    };

    axios
      .post('/orders.json', order)
      .then(() => {
        this.setState({ loading: false });
        history.push('/');
      })
      .catch(() => this.setState({ loading: false }));
  };

  render = () => {
    const {
      name, email, address, loading,
    } = this.state;
    const contactForm = loading ? (
      <Spinner />
    ) : (
      <form>
        <input type="text" name="name" placeholder={name || 'Your name'} />
        <input type="text" name="email" placeholder={email || 'Your email'} />
        <input type="text" name="street" placeholder={address.street || 'Your street'} />
        <input type="text" name="postalCode" placeholder={address.postalCode || 'Your name'} />
        <Button buttonType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );

    return (
      <div className={styles.ContactData}>
        <h4>Enter your contact data</h4>
        {contactForm}
      </div>
    );
  };
}

export default ContactData;
