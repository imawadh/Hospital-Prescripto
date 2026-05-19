import { Component } from "react";

// Catches render-time errors anywhere below it so one broken component does
// not blank the entire app. Logs the error and shows a recoverable fallback.
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled UI error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
          <h1 className="text-xl font-semibold text-slate-800">
            Something went wrong
          </h1>
          <p className="text-slate-500 max-w-md">
            An unexpected error occurred. Please reload the page; if the
            problem persists, contact support.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 rounded bg-slate-800 text-white"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
