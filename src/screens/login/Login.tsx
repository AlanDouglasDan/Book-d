import { FC, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// import { useAuth } from "store/auth/hooks";
import { AuthStackNavParams } from "navigation/auth-stack/AuthStackNav";
import { palette, spacing } from "core/styles";
import { Input } from "components/Input";
import { PasswordInput } from "components/PasswordInput";
import { Button } from "components/Button";
// import { ErrorModal } from "components/ErrorModal";
import { images } from "core/images";
import styles from "./Login.styles";

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup.string().required("Required").email("Email address is invalid"),
  password: yup.string().required("Required"),
});

const Login: FC<NativeStackScreenProps<AuthStackNavParams, "Login">> = ({
  navigation,
}) => {
  // const { login, loading, error, setError } = useAuth();

  useEffect(() => {
    AsyncStorage.getItem("expoPushToken").then((res) => console.log(res));
  }, []);

  const onSubmit = async (values: FormValues) => {
    // const { email, password } = values;

    // const res = await login({
    //   ...values,
    //   email: email.toLocaleLowerCase(),
    // });
    console.log(values);
    navigation.navigate("Bottom Tabs");
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
          Enter your details to access your account.
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
            return (
              <>
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
                />

                <PasswordInput
                  placeholder="Password"
                  value={values.password}
                  onChangeText={(text) => setFieldValue("password", text)}
                  containerStyle={spacing.marginTop24}
                  error={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                  onBlur={() => setFieldTouched("password")}
                />

                <Button
                  title="Login"
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
          <Text style={styles.textInfo}>Don't have an account yet? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
            <Text style={styles.textHighlight}>Signup</Text>
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

export default Login;
