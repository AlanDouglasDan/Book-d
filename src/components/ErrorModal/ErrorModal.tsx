import { FC } from "react";
import { Modal, View, Text, TouchableOpacity, Pressable } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

import { layout, spacing } from "core/styles";
import styles from "./ErrorModal.styles";

interface ErrorModalProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

const ErrorModal: FC<ErrorModalProps> = ({ message, open, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={open}
      onRequestClose={onClose}
    >
      <Pressable style={layout.flex1} onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContentContainer}>
            <View style={styles.flexedRow}>
              <AntDesign
                name="exclamationcircleo"
                size={20}
                color="rgba(217, 45, 32, 1)"
              />

              <TouchableOpacity onPress={onClose}>
                <Feather name="x" size={20} color="rgba(217, 45, 32, 1)" />
              </TouchableOpacity>
            </View>

            <Text style={[styles.semiHeader14, spacing.marginTop12]}>
              There was a problem with that action
            </Text>

            <Text style={styles.text14}>
              {message ?? "Ouch, seems something went wrong."}
            </Text>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ErrorModal;
