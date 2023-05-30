import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyleSheet, View, TextInput, Button } from "react-native";
import "../App.css";
import "../style.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Simulating sign-in with hard-coded credentials
    const hardcodedUsername = "admin";
    const hardcodedPassword = "password";

    if (username === hardcodedUsername && password === hardcodedPassword) {
      window.alert("Sign In Successfully");
      // setSignedInUsername(username);
      navigate("/");
    } else {
      window.alert("Invalid username or password");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Sign In" onPress={handleSignIn} color="#d3a7ad" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 70,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%"
  }
});

export default Register;
