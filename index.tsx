import React from 'react';
import { View } from 'react-native';

import App from './app/Navigation';

const IndexScreen: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <App></App>
      
    </View>
  );
};

export default IndexScreen;