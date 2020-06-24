import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24
  },
  listagem: {
    marginTop: 22
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
});

export default styles;
