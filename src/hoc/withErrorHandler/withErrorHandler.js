// @flow
import * as React from 'react';
import type { AxiosInstance } from 'axios';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = <Config>(
  WrappedComponent: React.AbstractComponent<Config>,
  axios: AxiosInstance,
): React.AbstractComponent<Config> => (props: Config) => {
    const [errorState, setErrorState] = React.useState(null);
    React.useEffect(() => {
      const requestInterceptor = axios.interceptors.request.use((request) => {
        setErrorState(null);
        return request;
      });

      return () => {
        axios.interceptors.request.eject(requestInterceptor);
      };
    }, []);

    React.useEffect(() => {
      const responseInterceptor = axios.interceptors.response.use(
        response => response,
        (error) => {
          setErrorState(error);
        },
      );

      return () => {
        axios.interceptors.response.eject(responseInterceptor);
      };
    }, []);

    const errorConfirmedHandler = () => {
      setErrorState(null);
    };

    return (
      <React.Fragment>
        <Modal show={errorState != null} modalClosed={errorConfirmedHandler}>
          {errorState ? errorState.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };

export default withErrorHandler;
