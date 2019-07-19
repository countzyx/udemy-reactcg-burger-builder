// @flow
import * as React from 'react';
import type { AxiosInstance } from 'axios';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = <Config>(
  WrappedComponent: React.AbstractComponent<{| ...Config |}>,
  axios: AxiosInstance,
): React.AbstractComponent<Config> => (props: Config) => {
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
      axios.interceptors.request.use((request) => {
        setError(null);
        return request;
      });

      axios.interceptors.response.use(
        response => response,
        (err) => {
          setError(err);
        },
      );
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
