import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import TokyoImg from '../assets/tokyo.jpg';
import Layout from './Layout';

type Props = {
  error: string;
  onRetry?: () => void;
  fromNoMatch?: boolean;
};

const Container = styled.main`
  position: relative;
  height: 100vh;
  margin: 0;
  background: #333 url(${TokyoImg}) no-repeat center center / cover;
  text-align: center;
`;

const Inner = styled.div`
  background: rgba(0, 0, 0, 0.75);
  height: 100%;
  padding: 0 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
`;

const ErrorCode = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.5;

  @media (min-width: 800px) {
    font-size: 2rem;
  }
`;

const Message = styled.p`
  margin-top: 4px;
  line-height: 1.5;
  opacity: 0.75;
`;

const buttonMixin = css`
  padding: 12px 24px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  border: 1px solid white;
  cursor: default;
  text-align: center;
  margin-top: 16px;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  :focus {
    outline: none;
  }
  @media (min-width: 800px) {
    margin-top: 24px;
  }
`;

const Button = styled.button`
  ${buttonMixin}
`;

const StyledLink = styled(Link)`
  ${buttonMixin}
`;

const ErrorScreen: React.FC<Props> = ({
  error,
  onRetry,
  fromNoMatch,
}: Props) => (
  <Layout>
    <Container>
      <Inner>
        <ErrorCode>{error}</ErrorCode>
        <Message>
          申し訳ありませんが、リクエストの処理中にエラーが発生しました。
        </Message>
        {onRetry && <Button>リトライ</Button>}
        {fromNoMatch && <StyledLink to="/">トップ</StyledLink>}
      </Inner>{' '}
    </Container>
  </Layout>
);

export default ErrorScreen;
