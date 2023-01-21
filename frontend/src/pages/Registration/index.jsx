import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert("Registration error!");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Full name"
          error={errors.fullName?.message}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Type full name" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          error={errors.email?.message}
          helperText={errors.email?.message}
          {...register("email", { required: "Type E-Mail" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          error={errors.password?.message}
          helperText={errors.password?.message}
          {...register("password", { required: "Type password" })}
          fullWidth
        />
        <Button
          disabled={!isValid}
          variant="contained"
          type="submit"
          size="large"
          fullWidth
        >
          Register
        </Button>
      </form>
    </Paper>
  );
};
