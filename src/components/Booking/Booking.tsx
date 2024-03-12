import { FC, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";

import { palette, common, spacing } from "core/styles";
import styles from "./Booking.styles";

interface BookingProps {
  booking: any;
}

const Booking: FC<BookingProps> = ({ booking }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <View style={{ position: "relative" }}>
      <TouchableOpacity
        style={[
          common.shadow,
          styles.flexedRow,
          styles.transactionContainer,
          spacing.marginBottom12,
        ]}
        key={booking.id}
        delayLongPress={500}
        onLongPress={() => setOpen(true)}
        onPress={() => setOpen(false)}
      >
        <View style={styles.flexedRow}>
          {/* {transaction?.type === "inward" ? <Inward /> : <Outward />} */}

          <View style={styles.gap}>
            <Text style={styles.header14}>{booking?.body}</Text>
            <Text style={styles.text12}>{booking?.period}</Text>
          </View>
        </View>

        <View style={styles.gap}>
          <Text style={[styles.text12, styles.textRight]}>{booking?.time}</Text>
          <Text
            style={[styles.text12, styles.textRight, { color: palette.GREEN }]}
          >
            {booking?.status}
          </Text>
        </View>
      </TouchableOpacity>

      {open && (
        <View style={[styles.dropdownContainer, common.shadow]}>
          <TouchableOpacity>
            <Text style={[styles.text14]}>Update</Text>
          </TouchableOpacity>

          <View style={styles.line} />

          <TouchableOpacity>
            <Text style={[styles.text14, { color: palette.RED }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Booking;
