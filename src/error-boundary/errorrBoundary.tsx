import { Component, ErrorInfo, ReactNode } from "react";
import Button from "@material-ui/core/Button";

interface IErrorBoundaryProps {
  children: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}
const reoload = () => {
  window.location.reload();
};
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

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <div>Oops.... an error occurred</div>
          <Button onClick={reoload} variant="contained">
            Reload
          </Button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
