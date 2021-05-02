import React from 'react';
import ErrorScreen from '../components/ErrorScreen';

const NoMatchPage: React.FC = () => (
  <ErrorScreen fromNoMatch error="404 Not Found" />
);

export default NoMatchPage;
