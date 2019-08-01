// @flow
import React, { Component } from 'react';
import type { History } from 'react-router';
import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import type {
  FormElement,
  FormElementValidationRules,
  Ingredients,
  OrderForm,
} from '../../../types';
import axios from '../../../axios-orders';

type State = {
  orderForm?: OrderForm,
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
        valid: true,
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
        valid: false,
        validation: {
          required: true,
        },
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
        valid: false,
        validation: {
          required: true,
        },
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
        valid: false,
        validation: {
          required: true,
          minLength: 5,
          maxLength: 10,
        },
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
        valid: false,
        validation: {
          required: true,
        },
        value: '1 Test Street',
      },
    },
    loading: false,
  };

  orderHandler = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { orderForm } = this.state;
    if (!orderForm) {
      return;
    }

    const orderData = Object.keys(orderForm).reduce((acc, key) => {
      acc[key] = orderForm[key].value;
      return acc;
    }, {});

    const { ingredients, totalPrice, history } = this.props;
    const order = {
      ingredients,
      orderData,
      price: totalPrice,
    };

    axios
      .post('/orders.json', order)
      .then(() => {
        this.setState({ loading: false });
        history.push('/');
      })
      .catch(() => this.setState({ loading: false }));
  };

  checkValidity = (value: string, rules: FormElementValidationRules) => {
    let isValid = true;
    const trimmedValue = value.trim();

    if (rules.required) {
      isValid = trimmedValue !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = trimmedValue.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = trimmedValue.length <= rules.maxLength && isValid;
    }

    return isValid;
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
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
    );

    updatedOrderForm[id] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
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
      const config: FormElement = orderForm[key];
      return (
        <Input
          changed={event => this.inputChangedHandler(event, key)}
          key={key}
          elementConfig={config.elementConfig}
          id={key}
          inputType={config.elementType}
          invalid={!config.valid}
          label={config.label}
          shouldValidate={config.validation !== undefined}
          value={config.value}
        />
      );
    });

    return (
      <div className={styles.ContactData}>
        <h4>Enter your contact data</h4>
        <form onSubmit={this.orderHandler}>
          {formElements}
          <Button buttonType="Success">Order</Button>
        </form>
      </div>
    );
  };
}

export default ContactData;
