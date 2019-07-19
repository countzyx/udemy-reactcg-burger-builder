// @flow
import * as React from 'react';
import type { AxiosInstance } from 'axios';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = <Config>(
  WrappedComponent: React.AbstractComponent<Config>,
  axios: AxiosInstance,
): React.AbstractComponent<Config> => (props: Config) => {
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
      const requestInterceptor = axios.interceptors.request.use((request) => {
        setError(null);
        return request;
      });

      return () => {
        axios.interceptors.request.eject(requestInterceptor);
      };
    }, []);

    React.useEffect(() => {
      const responseInterceptor = axios.interceptors.response.use(
        response => response,
        (err) => {
          setError(err);
        },
      );

      return () => {
        axios.interceptors.response.eject(responseInterceptor);
      };
    }, []);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <React.Fragment>
        <Modal show={error != null} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };

export default withErrorHandler;
