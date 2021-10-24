import React, { Component, ErrorInfo, ReactNode } from "react";
import Button from "@material-ui/core/Button";

interface IErrorBoundaryProps {
  children: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  onClickReloadPage = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <div>Oops.... an error occurred</div>
          <Button onClick={this.onClickReloadPage} variant="contained">
            Reload
          </Button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
