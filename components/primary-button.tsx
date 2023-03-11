import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import theme from "../constants/theme";

export type PrimaryButtonProps = {
  title: string;
  onPressed: () => void;
};

export default function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={styles.btn}
      activeOpacity={0.5}
      onPress={props.onPressed}
    >
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.Colors.primary,
    width: "90%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.Colors.white,
  },
});
