import React, { FC, useState, useEffect } from "react";
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
import { useAuth } from "store/auth/hooks";
import { useUser } from "store/user/hooks";
import { ErrorModal } from "components/ErrorModal";
import { SuccessModal } from "components/SuccessModal";
import { Input } from "components/Input";
import { Button } from "components/Button";
import { spacing, palette } from "core/styles";
import styles from "./Dashboard.styles";

interface FormValues {
  firstName: string;
  lastName: string;
  phone: string;
  businessName: string;
  address: string;
  email: string;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  businessName: "",
  address: "",
  email: "",
};

const invalidNameMessage = "Name should be in letters between 3-30 characters";

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required("Required")
    .matches(/^[aA-zZ\s]+$/, invalidNameMessage)
    .min(3, invalidNameMessage)
    .max(30, invalidNameMessage),
  lastName: yup
    .string()
    .required("Required")
    .matches(/^[aA-zZ\s]+$/, invalidNameMessage)
    .min(3, invalidNameMessage)
    .max(30, invalidNameMessage),
  phone: yup.string().required("Required"),
  businessName: yup.string().required("Required"),
  address: yup.string().required("Required"),
  email: yup.string().required("Required").email("Email address is invalid"),
});

const Dashboard: FC<BottomTabScreenProps<BottomTabsNavParams, "Dashboard">> = ({
  navigation,
}) => {
  const { current } = useAuth();
  const { updateUser, loading, error, setError } = useUser();

  const [media, setMedia] = useState<ImagePicker.ImagePickerAsset>();
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = async (values: FormValues) => {
    const res = await updateUser(values);

    if (res && !res.error) {
      setOpen(true);
    }
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
            useEffect(() => {
              if (current) {
                setFieldValue("firstName", current.firstName);
                setFieldValue("lastName", current.lastName);
                setFieldValue("email", current.email);
                setFieldValue("phone", current.phone);
                setFieldValue("businessName", current.businessName);
                setFieldValue("address", current.address);
              }
            }, [setFieldValue]);

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
                  value={values.firstName}
                  onChangeText={(text) => setFieldValue("firstName", text)}
                  containerStyle={spacing.marginTop28}
                  error={
                    touched.firstName && errors.firstName
                      ? errors.firstName
                      : undefined
                  }
                  onBlur={() => setFieldTouched("firstName")}
                />

                <Input
                  placeholder="Last name"
                  value={values.lastName}
                  onChangeText={(text) => setFieldValue("lastName", text)}
                  containerStyle={spacing.marginTop20}
                  error={
                    touched.lastName && errors.lastName
                      ? errors.lastName
                      : undefined
                  }
                  onBlur={() => setFieldTouched("lastName")}
                />

                <Input
                  placeholder="Email"
                  value={values.email}
                  onChangeText={(text) => setFieldValue("email", text)}
                  containerStyle={spacing.marginTop20}
                  error={
                    touched.email && errors.email ? errors.email : undefined
                  }
                  onBlur={() => setFieldTouched("email")}
                  keyboardType="email-address"
                  disabled
                />

                <Input
                  value={values.phone}
                  onChangeText={(text) => setFieldValue("phone", text)}
                  containerStyle={spacing.marginTop20}
                  error={
                    touched.phone && errors.phone ? errors.phone : undefined
                  }
                  onBlur={() => setFieldTouched("phone")}
                  placeholder="Phone No"
                  disabled
                />

                <Input
                  value={values.businessName}
                  onChangeText={(text) => setFieldValue("businessName", text)}
                  containerStyle={spacing.marginTop20}
                  error={
                    touched.businessName && errors.businessName
                      ? errors.businessName
                      : undefined
                  }
                  onBlur={() => setFieldTouched("businessName")}
                  placeholder="Business Name"
                />

                <Input
                  value={values.address}
                  onChangeText={(text) => setFieldValue("address", text)}
                  containerStyle={spacing.marginTop20}
                  error={
                    touched.address && errors.address
                      ? errors.address
                      : undefined
                  }
                  onBlur={() => setFieldTouched("address")}
                  placeholder="Address"
                />

                <Button
                  title="Save Changes"
                  onPress={handleSubmit}
                  style={spacing.marginTop28}
                  loading={loading}
                  disabled={loading}
                />
              </>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>

      <ErrorModal
        open={!!error}
        onClose={() => setError(false)}
        message={
          typeof error === "string" ? error : "Oops, something went wrong!"
        }
      />

      <SuccessModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        message="Profile Updated Successfully"
      />
    </SafeAreaView>
  );
};

export default Dashboard;
