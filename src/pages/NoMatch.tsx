import React, { memo } from 'react';
import ErrorScreen from '../components/ErrorScreen';

const NoMatchPage: React.FC = () => <ErrorScreen error="404 Not Found" />;

export default memo(NoMatchPage);
