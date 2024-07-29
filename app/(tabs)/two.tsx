import React from 'react';
import { View, Text } from 'react-native';
import LoginScreen from '@/components/login';

const IndexScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <LoginScreen />
    </View>
  );
};

export default LoginScreen;