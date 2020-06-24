import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textLogo: {
    color: "rgb(134, 147, 158)",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },
  botao: {
    marginBottom: 50,
  },
});

export default styles;
