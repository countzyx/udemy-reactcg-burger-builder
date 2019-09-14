// @flow
import * as React from 'react';
import type { History } from 'react-router';
import { connect } from 'react-redux';
import type { Dispatch, ReduxProps } from 'redux';
import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import type {
  Action,
  BurgerOrder,
  DeliveryData,
  FormElement,
  ContactForm,
  ReduxState,
} from '../../../types';
import { getErrorMessage } from '../../../shared/validation';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions';

type State = {
  formIsValid: boolean,
  orderForm?: ContactForm,
};

type OwnProps = {|
  history: History,
|};

const mapStateToProps = (state: ReduxState) => ({
  ingredients: state.burger.ingredients,
  loading: state.orders.loading,
  token: state.auth.token,
  totalPrice: state.burger.totalPrice,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  // eslint-disable-next-line max-len
  onOrderBurger: (order: BurgerOrder, token: string) => dispatch(actions.purchaseBurgerStart(order, token)),
});

type Props = {|
  ...OwnProps,
  ...ReduxProps<typeof mapStateToProps>,
|};

type DefaultProps = {};

const initialFormState: State = {
  formIsValid: true,
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
      touched: false,
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
      touched: false,
      valid: true,
      validation: {
        required: true,
        isEmail: true,
      },
      validationError: null,
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
      touched: false,
      valid: true,
      validation: {
        required: true,
      },
      validationError: null,
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
      touched: false,
      valid: true,
      validation: {
        required: true,
        minLength: 5,
        maxLength: 10,
      },
      validationError: null,
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
      touched: false,
      valid: true,
      validation: {
        required: true,
      },
      validationError: null,
      value: '1 Test Street',
    },
  },
};

const ContactData = (props: Props) => {
  const [formState, setFormState] = React.useState(initialFormState);

  const orderHandler = React.useCallback(
    (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();

      const { orderForm } = formState;
      if (!orderForm) {
        return;
      }

      const deliveryData: DeliveryData = Object.keys(orderForm).reduce((acc, key) => {
        acc[key] = orderForm[key].value;
        return acc;
      }, {});

      const {
        ingredients, token, totalPrice, userId, onOrderBurger,
      } = props;
      const order: BurgerOrder = {
        deliveryData,
        id: null,
        ingredients,
        price: totalPrice,
        userId,
      };
      onOrderBurger(order, token);
    },
    [formState, props],
  );

  const inputChangedHandler = React.useCallback(
    (event: SyntheticEvent<HTMLInputElement>, id: string) => {
      const { orderForm } = formState;
      const updatedOrderForm = {
        ...orderForm,
      };
      const updatedFormElement = {
        ...updatedOrderForm[id],
      };

      updatedFormElement.value = event.currentTarget.value;
      updatedFormElement.validationError = getErrorMessage(
        updatedFormElement.value,
        updatedFormElement.validation,
      );
      updatedFormElement.valid = !updatedFormElement.validationError;
      updatedFormElement.touched = true;

      updatedOrderForm[id] = updatedFormElement;

      const formIsValid = Object.keys(updatedOrderForm).reduce<boolean>(
        // eslint-disable-next-line max-len
        (acc, k) => (updatedOrderForm[k].valid === undefined ? acc : acc && updatedOrderForm[k].valid),
        true,
      );

      setFormState({ formIsValid, orderForm: updatedOrderForm });
    },
    [formState, setFormState],
  );

  const { loading } = props;
  if (loading) {
    return <Spinner />;
  }

  const { formIsValid, orderForm } = formState;
  if (!orderForm) {
    return <p>No order form data present.</p>;
  }

  const formElements = Object.keys(orderForm).map((key) => {
    const config: FormElement = orderForm[key];
    return (
      <Input
        changed={event => inputChangedHandler(event, key)}
        key={key}
        elementConfig={config.elementConfig}
        id={key}
        inputType={config.elementType}
        invalid={!config.valid}
        label={config.label}
        shouldValidate={config.validation !== undefined}
        touched={config.touched}
        validationError={config.validationError}
        value={config.value}
      />
    );
  });

  return (
    <div className={styles.ContactData}>
      <h4>Enter your contact data</h4>
      <form onSubmit={orderHandler}>
        {formElements}
        <Button buttonType="Success" isDisabled={!formIsValid}>
          Order
        </Button>
      </form>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler<React.Config<Props, DefaultProps>>(ContactData, axios));
