import { FC, useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useAuth } from "store/auth/hooks";
import { AuthStackNavParams } from "navigation/auth-stack/AuthStackNav";
import { palette, spacing } from "core/styles";
import { Input } from "components/Input";
import { PasswordInput } from "components/PasswordInput";
import { Button } from "components/Button";
import { ErrorModal } from "components/ErrorModal";
import { images } from "core/images";
import * as yup from "yup";
import styles from "./SignUp.styles";

interface FormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  businessName: string;
  address: string;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  businessName: "",
  address: "",
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
  email: yup.string().required("Required").email("Email address is invalid"),
  password: yup.string().required("Required"),
  businessName: yup.string().required("Required"),
  address: yup.string().required("Required"),
});

const SignUp: FC<NativeStackScreenProps<AuthStackNavParams, "Sign Up">> = ({
  navigation,
}) => {
  const { signUp, loading, error, setError } = useAuth();

  const onSubmit = async (values: FormValues) => {
    const { email, ...rest } = values;

    const res = await signUp({
      ...rest,
      email: email.toLocaleLowerCase(),
    });
    if (res && !res.error) navigation.navigate("Login");
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
        <Image
          source={images.book}
          resizeMode="contain"
          style={{ width: "40%", alignSelf: "center" }}
        />

        <Text style={styles.header24}>Book-d for businesses</Text>

        <Text style={styles.text16}>
          Enter your details to create your account.
        </Text>

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
            handleSubmit,
            setFieldTouched,
          }) => {
            const emailAlreadyExistsError = errors.email?.match(
              /email address already exists/i
            );

            return (
              <>
                <View style={[styles.nameRow, spacing.marginTop16]}>
                  <Input
                    placeholder="First name"
                    value={values.firstName}
                    onChangeText={(text) => setFieldValue("firstName", text)}
                    containerStyle={styles.nameFields}
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
                    containerStyle={styles.nameFields}
                    error={
                      touched.lastName && errors.lastName
                        ? errors.lastName
                        : undefined
                    }
                    onBlur={() => setFieldTouched("lastName")}
                  />
                </View>

                <Input
                  placeholder="Email"
                  value={values.email}
                  onChangeText={(text) => setFieldValue("email", text)}
                  containerStyle={spacing.marginTop20}
                  error={
                    touched.email && errors.email && !emailAlreadyExistsError
                      ? errors.email
                      : undefined
                  }
                  onBlur={() => setFieldTouched("email")}
                  keyboardType="email-address"
                />

                <Input
                  placeholder="Phone number"
                  value={values.phone}
                  onChangeText={(text) => setFieldValue("phone", text)}
                  containerStyle={spacing.marginTop20}
                  error={
                    touched.phone && errors.phone
                      ? errors.phone
                      : undefined
                  }
                  onBlur={() => setFieldTouched("phone")}
                />

                <Input
                  placeholder="Business name"
                  value={values.businessName}
                  onChangeText={(text) => setFieldValue("businessName", text)}
                  containerStyle={spacing.marginTop20}
                  error={
                    touched.businessName && errors.businessName
                      ? errors.businessName
                      : undefined
                  }
                  onBlur={() => setFieldTouched("businessName")}
                />

                <Input
                  placeholder="Address"
                  value={values.address}
                  onChangeText={(text) => setFieldValue("address", text)}
                  containerStyle={spacing.marginTop20}
                  error={
                    touched.address && errors.address
                      ? errors.address
                      : undefined
                  }
                  onBlur={() => setFieldTouched("address")}
                />

                <PasswordInput
                  placeholder="Password"
                  value={values.password}
                  onChangeText={(text) => setFieldValue("password", text)}
                  containerStyle={spacing.marginTop20}
                  error={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                  onBlur={() => setFieldTouched("password")}
                />

                <Button
                  title="Sign Up"
                  onPress={() => handleSubmit()}
                  style={spacing.marginTop28}
                  loading={loading}
                  disabled={loading}
                />
              </>
            );
          }}
        </Formik>

        <View style={styles.loginInfoContainer}>
          <Text style={styles.textInfo}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.textHighlight}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <ErrorModal
        open={!!error}
        onClose={() => setError(false)}
        message={
          typeof error === "string" ? error : "Oops, something went wrong!"
        }
      />
    </SafeAreaView>
  );
};

export default SignUp;
