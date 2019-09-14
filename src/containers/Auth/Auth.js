// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import type { Dispatch, ReduxProps } from 'redux';
import * as styles from './Auth.module.css';
import type {
  Action, AuthForm, FormElement, ReduxState,
} from '../../types';
import { getErrorMessage } from '../../shared/validation';
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
  onLogin: (email: string, password: string) => dispatch(actions.authStart(email, password)),
  onSetAuthRedirectPath: (path: string) => dispatch(actions.setAuthRedirectPath(path)),
  onSignUp: (email: string, password: string) => dispatch(actions.signUpStart(email, password)),
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

const initialFormState: State = {
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

const Auth = (props: Props) => {
  const [formState, setFormState] = React.useState(initialFormState);
  const {
    building,
    error,
    loading,
    redirectPath,
    onLogin,
    onSetAuthRedirectPath,
    onSignUp,
    userAuthenticated,
  } = props;

  React.useEffect(() => {
    if (!building && redirectPath !== '/') {
      onSetAuthRedirectPath('/');
    }
  }, [building, redirectPath, onSetAuthRedirectPath]);

  const changeInputHandler = React.useCallback(
    (event: SyntheticEvent<HTMLInputElement>, id: string) => {
      const { authForm } = formState;
      const updatedAuthForm = {
        ...authForm,
      };
      const updatedFormElement = {
        ...updatedAuthForm[id],
      };

      updatedFormElement.value = event.currentTarget.value;
      updatedFormElement.validationError = getErrorMessage(
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

      setFormState(prevState => ({ ...prevState, formIsValid, authForm: updatedAuthForm }));
    },
    [formState, setFormState],
  );

  const loginHandler = React.useCallback(
    (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();

      const { authForm, isSignUp } = formState;
      if (!authForm) {
        return;
      }
      const onAction = isSignUp ? onSignUp : onLogin;
      onAction(authForm.email.value, authForm.password.value);
    },
    [formState, onLogin, onSignUp],
  );

  const switchAuthModeHandler = React.useCallback(() => {
    setFormState(prevState => ({ ...prevState, isSignUp: !prevState.isSignUp }));
  }, [setFormState]);

  if (userAuthenticated) {
    return <Redirect to={redirectPath} />;
  }

  if (loading) {
    return <Spinner />;
  }

  const { authForm, formIsValid, isSignUp } = formState;
  if (!authForm) {
    return <p>No order form present.</p>;
  }

  const formElements = Object.keys(authForm).map((key) => {
    const config: FormElement = authForm[key];
    return (
      <Input
        changed={event => changeInputHandler(event, key)}
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
      <form onSubmit={loginHandler}>
        {formElements}
        <Button buttonType="Success" isDisabled={!formIsValid}>
          {isSignUp ? 'Sign Up' : 'Login'}
        </Button>
      </form>
      <Button buttonType="Danger" clicked={switchAuthModeHandler}>
        {`Switch to ${isSignUp ? 'Login' : 'Signup'}`}
      </Button>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);
