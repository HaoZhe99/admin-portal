"use server";
import { signIn } from "../../../../auth";
import { console } from "next/dist/compiled/@edge-runtime/primitives";

export const LogInAction = async (formData) => {
  try {
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    return res;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Invalid credentials.",
    };
  }
};
