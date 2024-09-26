import { createStackNavigator } from "@react-navigation/stack"
import Login from "../screens/Login"
import Register from "../screens/Register"
import Admin from "../screens/Admin"
import Customer from "../screens/Customers"
import { ForgotPasswordScreen, LoginScreen, SignupScreen } from "../screens"

const Stack = createStackNavigator()

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={Admin} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}

export default Router