import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const Login = () => {
  let username: string = '';
  const setUsername = (newUsername: string) => {
    username = newUsername;
  };

  return (
    
    <View style={styles.container}>
      
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TouchableOpacity style={styles.button}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>facebook</Text>
        </View>
        <Text style={styles.buttonText}>facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>google</Text>
        </View>
        <Text style={styles.buttonText}>google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>twitter</Text>
        </View>
        <Text style={styles.buttonText}>twitter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>gmail</Text>
        </View>
        <Text style={styles.buttonText}>gmail</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPassword}>Forgot Password</Text>
      <Text style={styles.forgotPasswordLink}>www.reallygreatsite.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B2DFDB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderColor: '#4CAF50',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15, 
    paddingHorizontal: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    marginVertical: 10,
    width: '25%', 
    justifyContent: 'center',
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    left: 15,
    backgroundColor: '#E0F2F1',
    padding: 8,
    borderRadius: 25,
  },
  icon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
  },
  forgotPassword: {
    marginTop: 20,
    fontSize: 14,
    color: '#4CAF50',
  },
  forgotPasswordLink: {
    fontSize: 12,
    color: '#4CAF50',
  },
});

export default Login;