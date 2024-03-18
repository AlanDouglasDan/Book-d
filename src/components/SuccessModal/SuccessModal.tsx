import { FC } from "react";
import { Modal, View, Text, TouchableOpacity, Pressable } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

import { layout, palette } from "core/styles";
import { spacing } from "core/styles/spacing";
import styles from "./SuccessModal.styles";

interface SuccessModalProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

const SuccessModal: FC<SuccessModalProps> = ({ message, open, onClose }) => {
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
              <Feather
                name="check-circle"
                size={20}
                color={palette.SUCCESS_600}
              />

              <TouchableOpacity onPress={onClose}>
                <Feather name="x" size={20} color={palette.SUCCESS_700} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.semiHeader14, spacing.marginTop12]}>
              Success
            </Text>

            <Text style={styles.text14}>
              {message ?? "Action completed successfully."}
            </Text>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default SuccessModal;
