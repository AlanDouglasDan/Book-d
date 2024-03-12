import React, { FC, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { BottomTabsNavParams } from "navigation/bottom-tabs-nav/BottomTabsNav";
import { Input } from "components/Input";
import { Button } from "components/Button";
import { spacing, palette, common } from "core/styles";
// import {images} from 'core/images';
import styles from "./Dashboard.styles";

interface FormValues {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
}

const initialValues: FormValues = {
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
};

const invalidNameMessage = "Name should be in letters between 3-30 characters";

const validationSchema = yup.object({
  first_name: yup
    .string()
    .required("Required")
    .matches(/^[aA-zZ\s]+$/, invalidNameMessage)
    .min(3, invalidNameMessage)
    .max(30, invalidNameMessage),
  last_name: yup
    .string()
    .required("Required")
    .matches(/^[aA-zZ\s]+$/, invalidNameMessage)
    .min(3, invalidNameMessage)
    .max(30, invalidNameMessage),
  phone_number: yup.string().required("Required"),
  email: yup.string().required("Required").email("Email address is invalid"),
});

const Dashboard: FC<BottomTabScreenProps<BottomTabsNavParams, "Dashboard">> = ({
  navigation,
}) => {
  const [media, setMedia] = useState<ImagePicker.ImagePickerAsset>();

  const onSubmit = async (values: FormValues) => {
    console.log(values);
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        selectionLimit: 1,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setMedia(result.assets[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        style={styles.innerContainer}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={20}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.header24}>My Account</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            touched,
            errors,
            setFieldValue,
            setFieldTouched,
            handleSubmit,
          }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            // useEffect(() => {
            //   if (current) {
            //     setFieldValue("first_name", current?.first_name);
            //     setFieldValue("last_name", current?.last_name);
            //     setFieldValue("email", current?.email);
            //     setFieldValue("phone_number", current.phone_number);
            //   }
            // }, [setFieldValue]);

            return (
              <>
                <View style={styles.flexedRow}>
                  <View style={styles.uploadContainer}>
                    {media ? (
                      <Image
                        source={{ uri: media.uri }}
                        resizeMode="contain"
                        style={{ width: "90%", height: "100%" }}
                      />
                    ) : (
                      <Ionicons name="person" size={50} color={palette.GREY3} />
                    )}
                  </View>

                  <TouchableOpacity
                    style={[styles.uploadContainer, styles.bordered]}
                    onPress={pickImage}
                  >
                    <Text style={styles.text14}>Upload</Text>
                  </TouchableOpacity>
                </View>

                <Input
                  placeholder="First name"
                  value={values.first_name}
                  onChangeText={(text) => setFieldValue("first_name", text)}
                  containerStyle={spacing.marginTop28}
                  error={
                    touched.first_name && errors.first_name
                      ? errors.first_name
                      : undefined
                  }
                  onBlur={() => setFieldTouched("first_name")}
                />

                <Input
                  placeholder="Last name"
                  value={values.last_name}
                  onChangeText={(text) => setFieldValue("last_name", text)}
                  containerStyle={spacing.marginTop28}
                  error={
                    touched.last_name && errors.last_name
                      ? errors.last_name
                      : undefined
                  }
                  onBlur={() => setFieldTouched("last_name")}
                />

                <Input
                  placeholder="Email"
                  value={values.email}
                  onChangeText={(text) => setFieldValue("email", text)}
                  containerStyle={spacing.marginTop28}
                  error={
                    touched.email && errors.email ? errors.email : undefined
                  }
                  onBlur={() => setFieldTouched("email")}
                  keyboardType="email-address"
                />

                <Input
                  value={values.phone_number}
                  onChangeText={(text) => setFieldValue("phone_number", text)}
                  containerStyle={spacing.marginTop28}
                  error={
                    touched.phone_number && errors.phone_number
                      ? errors.phone_number
                      : undefined
                  }
                  onBlur={() => setFieldTouched("phone_number")}
                  placeholder="Phone No"
                />

                <Button
                  title="Save Changes"
                  onPress={handleSubmit}
                  style={spacing.marginTop28}
                />
              </>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
