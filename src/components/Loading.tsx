import React from 'react';
import styled from 'styled-components';
import loading from '../assets/loading.svg';
import TokyoImg from '../assets/tokyo.jpg';
import Layout from './Layout';

const isJa = navigator.language.startsWith('ja');

type Props = {
  usingLocation?: boolean;
};

const Container = styled.main`
  position: relative;
  height: 100vh;
  max-height: -webkit-fill-available;
  margin: 0;
  background: #333;
  text-align: center;
  background-image: url(${TokyoImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const Inner = styled.div`
  background: rgba(0, 0, 0, 0.75);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
`;

const Text = styled.p`
  margin-top: 32px;
  opacity: 0.75;
  line-height: 1.5;
`;

const Loading: React.FC<Props> = ({ usingLocation }: Props) => {
  const message = ((): string => {
    if (isJa) {
      return usingLocation
        ? '位置情報を使わせてください！読み込み中です！'
        : '読み込み中です！';
    }
    return usingLocation
      ? 'Please allow the use of location information! Now loading!'
      : 'Now loading!';
  })();

  return (
    <Layout>
      <Container>
        <Inner>
          <img src={loading} alt="loading..." />
          <Text>{message}</Text>
        </Inner>
      </Container>
    </Layout>
  );
};
export default Loading;
