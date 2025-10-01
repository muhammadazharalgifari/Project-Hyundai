import FormSignin from "@/components/Form-Signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-28 px-4 mt-10">
      <FormSignin />
    </div>
  );
};

export default SignInPage;
