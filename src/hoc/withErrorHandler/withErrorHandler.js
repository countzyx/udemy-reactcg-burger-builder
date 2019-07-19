import * as React from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => class extends React.Component {
    state = {
      error: null,
    };

    componentDidMount = () => {
      axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      });

      axios.interceptors.response.use(
        response => response,
        (error) => {
          this.setState({ error });
        },
      );
    };

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render = () => {
      const { error } = this.state;
      return (
        <React.Fragment>
          <Modal show={error} modalClosed={this.errorConfirmedHandler}>
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    };
};

export default withErrorHandler;
