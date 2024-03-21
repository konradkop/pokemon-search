import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import { Provider } from "react-redux";
import store from "./store";
import PokemonScreen from "./screens/PokemonScreen";

const Stack = createNativeStackNavigator();

NativeWindStyleSheet.setOutput({
  default: "native",
});

const defaultScreenOptions = { headerShown: false };

export const screenTypes = {
  home: "Home",
  pokemon: "Pokemon",
};

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            options={defaultScreenOptions}
            name={screenTypes.home}
            component={HomeScreen}
          />
          <Stack.Screen
            options={defaultScreenOptions}
            name={screenTypes.pokemon}
            component={PokemonScreen}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
