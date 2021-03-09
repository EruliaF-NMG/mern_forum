/*
 * @Author: Chanaka Wickramasinghe
 * @Description: Error Boundary Component
 * @Date: 2020-02-05 04:26:42
 * @Last Modified by: Chanaka Wickramasinghe
 * @Last Modified time: 2020-05-08 16:48:15
 */

import React, { Component, Fragment } from "react";


class ErrorBoundary extends Component {

    static defaultProps = {
      displayComponent: null
    };

    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo);
    }
  
    render() {
      const DisplayComponent = this.props.displayComponent;

      return (
          <Fragment>
              {
                  (this.state.hasError) ? (
                      (this.props.displayComponent === null) ? (
                          <h1>Something went wrong.</h1>
                      ) : (
                          <DisplayComponent />
                      )
                  ) : (
                      <Fragment>
                          {this.props.children}
                      </Fragment>
                  )
              }
          </Fragment>
      )
    }
}

export default ErrorBoundary;
