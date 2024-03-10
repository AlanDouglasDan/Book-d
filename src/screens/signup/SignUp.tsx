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

// import { useAuth } from "store/auth/hooks";
import { AuthStackNavParams } from "navigation/auth-stack/AuthStackNav";
import { palette, spacing } from "core/styles";
import { Input } from "components/Input";
import { PasswordInput } from "components/PasswordInput";
import { Button } from "components/Button";
// import { ErrorModal } from "components/ErrorModal";
import { images } from "core/images";
import * as yup from "yup";
import styles from "./SignUp.styles";

interface FormValues {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
}

const initialValues: FormValues = {
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  password: "",
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
  password: yup.string().required("Required"),
});

const SignUp: FC<NativeStackScreenProps<AuthStackNavParams, "Sign Up">> = ({
  navigation,
}) => {
  // const { signUp, loading, error, setError } = useAuth();

  const onSubmit = async (values: FormValues) => {
    // const { email, phone_number } = values;

    // const res = await signUp({
    //   ...values,
    //   email: email.toLocaleLowerCase(),
    //   phone_number: `+234${phone_number}`,
    // });
    // if (res && !res.error)
    //   navigation.navigate("Email Verification", { email: values.email });
    console.log(values);
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
                <View style={[styles.nameRow, spacing.marginTop28]}>
                  <Input
                    placeholder="First name"
                    value={values.first_name}
                    onChangeText={(text) => setFieldValue("first_name", text)}
                    containerStyle={styles.nameFields}
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
                    containerStyle={styles.nameFields}
                    error={
                      touched.last_name && errors.last_name
                        ? errors.last_name
                        : undefined
                    }
                    onBlur={() => setFieldTouched("last_name")}
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
                  value={values.phone_number}
                  onChangeText={(text) => setFieldValue("phone_number", text)}
                  containerStyle={spacing.marginTop20}
                  error={
                    touched.phone_number && errors.phone_number
                      ? errors.phone_number
                      : undefined
                  }
                  onBlur={() => setFieldTouched("phone_number")}
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
                  // loading={loading}
                  // disabled={loading}
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

      {/* <ErrorModal
        open={!!error}
        onClose={() => setError(false)}
        message={
          typeof error === "string" ? error : "Oops, something went wrong!"
        }
      /> */}
    </SafeAreaView>
  );
};

export default SignUp;
