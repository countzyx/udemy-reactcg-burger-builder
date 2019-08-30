// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import type { Dispatch, ReduxProps } from 'redux';
import * as styles from './Auth.module.css';
import type {
  Action,
  AuthForm,
  FormElement,
  FormElementValidationRules,
  ReduxState,
} from '../../types';
import * as actions from '../../store/actions';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

type OwnProps = {||};

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state: ReduxState) => ({
  building: state.burger.building,
  error: state.auth.error,
  loading: state.auth.loading,
  redirectPath: state.auth.redirectPath,
  userAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onLogin: (email: string, password: string) => dispatch(actions.authAsync(email, password)),
  onSetAuthRedirectPath: (path: string) => dispatch(actions.setAuthRedirectPath(path)),
  onSignUp: (email: string, password: string) => dispatch(actions.signUpAsync(email, password)),
});

type Props = {|
  ...OwnProps,
  ...ReduxProps<typeof mapStateToProps, typeof mapDispatchToProps>,
|};

// type DefaultProps = {};

type State = {
  authForm: AuthForm,
  formIsValid: boolean,
  isSignUp: boolean,
};

class Auth extends React.Component<Props, State> {
  state = {
    authForm: {
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
      password: {
        elementType: 'input',
        elementConfig: {
          options: null,
          placeholder: '',
          type: 'password',
        },
        label: 'Password',
        touched: false,
        valid: true,
        validation: {
          required: true,
          minLength: 6,
        },
        validationError: null,
        value: 'test@test.com',
      },
    },
    formIsValid: true,
    isSignUp: false,
  };

  componentDidMount = () => {
    const { building, redirectPath, onSetAuthRedirectPath } = this.props;
    if (!building && redirectPath !== '/') {
      onSetAuthRedirectPath('/');
    }
  };

  getErrorMessage = (value: string, rules: FormElementValidationRules) => {
    const trimmedValue = value.trim();

    if (!rules) {
      return null;
    }

    if (rules.required && trimmedValue === '') {
      return 'Required';
    }

    if (rules.minLength && trimmedValue.length < rules.minLength) {
      return `Minimum length: ${rules.minLength}`;
    }

    if (rules.maxLength && trimmedValue.length > rules.maxLength) {
      return `Maximum length: ${rules.maxLength}`;
    }

    // eslint-disable-next-line no-useless-escape
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (rules.isEmail && !emailPattern.test(trimmedValue)) {
      return 'Email is not valid';
    }

    return null;
  };

  inputChangedHandler = (event: SyntheticEvent<HTMLInputElement>, id: string) => {
    const { authForm } = this.state;
    const updatedAuthForm = {
      ...authForm,
    };
    const updatedFormElement = {
      ...updatedAuthForm[id],
    };

    updatedFormElement.value = event.currentTarget.value;
    updatedFormElement.validationError = this.getErrorMessage(
      updatedFormElement.value,
      updatedFormElement.validation,
    );
    updatedFormElement.valid = !updatedFormElement.validationError;
    updatedFormElement.touched = true;

    updatedAuthForm[id] = updatedFormElement;

    const formIsValid = Object.keys(updatedAuthForm).reduce<boolean>(
      // eslint-disable-next-line max-len
      (acc, k) => (updatedAuthForm[k].valid === undefined ? acc : acc && updatedAuthForm[k].valid),
      true,
    );

    this.setState({ formIsValid, authForm: updatedAuthForm });
  };

  loginHandler = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { authForm, isSignUp } = this.state;
    if (!authForm) {
      return;
    }

    const { onLogin, onSignUp } = this.props;
    const action = isSignUp ? onSignUp : onLogin;
    action(authForm.email.value, authForm.password.value);
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => ({ isSignUp: !prevState.isSignUp }));
  };

  render = () => {
    const {
      error, loading, redirectPath, userAuthenticated,
    } = this.props;
    if (userAuthenticated) {
      return <Redirect to={redirectPath} />;
    }

    if (loading) {
      return <Spinner />;
    }

    const { authForm, formIsValid, isSignUp } = this.state;
    if (!authForm) {
      return <p>No order form present.</p>;
    }

    const formElements = Object.keys(authForm).map((key) => {
      const config: FormElement = authForm[key];
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
          touched={config.touched}
          validationError={config.validationError}
          value={config.value}
        />
      );
    });

    return (
      <div className={styles.Auth}>
        {error ? <p className={styles.Error}>{error.message}</p> : null}
        <h4>Enter your contact data</h4>
        <form onSubmit={this.loginHandler}>
          {formElements}
          <Button buttonType="Success" isDisabled={!formIsValid}>
            {isSignUp ? 'Sign Up' : 'Login'}
          </Button>
        </form>
        <Button buttonType="Danger" clicked={this.switchAuthModeHandler}>
          {`Switch to ${isSignUp ? 'Login' : 'Signup'}`}
        </Button>
      </div>
    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);
