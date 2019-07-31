// @flow
import React, { Component } from 'react';
import type { History } from 'react-router';
import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import type { Ingredients, OrderForm } from '../../../types';
import axios from '../../../axios-orders';

type State = {
  orderForm: ?OrderForm,
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
    orderForm: {
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'cheapest', displayValue: 'Cheapest' },
            { value: 'fastest', displayValue: 'Fastest' },
          ],
          placeholder: null,
          type: 'text',
        },
        label: 'Delivery Method',
        value: 'fastest',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          options: null,
          placeholder: 'Your email address',
          type: 'email',
        },
        label: 'Email',
        value: 'test@test.com',
      },
      name: {
        elementType: 'input',
        elementConfig: {
          options: null,
          placeholder: 'Your name',
          type: 'text',
        },
        label: 'Name',
        value: 'Max',
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          options: null,
          placeholder: 'Your postal code',
          type: 'text',
        },
        label: 'Postal Code',
        value: '41351',
      },
      streetAddress: {
        elementType: 'input',
        elementConfig: {
          options: null,
          placeholder: 'Your street address',
          type: 'text',
        },
        label: 'Street Address',
        value: '1 Test Street',
      },
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

  inputChangedHandler = (event: SyntheticEvent<HTMLInputElement>, id: string) => {
    const { orderForm } = this.state;
    const updatedOrderForm = {
      ...orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[id],
    };
    updatedFormElement.value = event.currentTarget.value;
    updatedOrderForm[id] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
    console.log(id, event.currentTarget.value);
  };

  render = () => {
    const { orderForm, loading } = this.state;
    if (loading) {
      return <Spinner />;
    }

    if (!orderForm) {
      return <p>No order form data present.</p>;
    }

    const formElements = Object.keys(orderForm).map((key) => {
      const config = orderForm[key];
      return (
        <Input
          changed={event => this.inputChangedHandler(event, key)}
          key={key}
          id={key}
          inputType={config.elementType}
          label={config.label}
          elementConfig={config.elementConfig}
          value={config.value}
        />
      );
    });

    return (
      <div className={styles.ContactData}>
        <h4>Enter your contact data</h4>
        <form>
          {formElements}
          <Button buttonType="Success" clicked={this.orderHandler}>
            Order
          </Button>
        </form>
      </div>
    );
  };
}

export default ContactData;
