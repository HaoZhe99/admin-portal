"use server";
import { signIn } from "../../../../auth";
import { toast } from "react-toastify";

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
  }
};
