import React, { type ReactNode } from "react";
import { styled } from "styled-components";

const ErrorMessageStyled = styled.div<{ fontSize?: string }>`
  font-size: ${({ fontSize }) => fontSize ? fontSize : "2em" };
  color: #fe0000;
  margin: 1rem;
  text-align: left;
  white-space: pre-wrap;
`

const ProductionErrorMessage = () => {
  return (
    <ErrorMessageStyled>Something went wrong ☹️ Please refresh</ErrorMessageStyled>
  );
}

const DevelopmentErrorMessage = (props: {error: Error | null}) => {
  return (
    <ErrorMessageStyled fontSize={"1em"}>
      {props.error?.stack}
    </ErrorMessageStyled>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false, error: null as Error | null };
  isProduction = process.env.NODE_ENV === "production";

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("error:", error);
      console.error("info:", info);
  }

  render() {
    if (this.state.hasError) {
      if (this.isProduction) {
        return <ProductionErrorMessage />;
      }
      else {
        return <DevelopmentErrorMessage error={this.state.error}/>;
      }
    }
    return this.props.children;
  }
}
