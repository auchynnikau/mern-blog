import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import styles from "./Header.module.scss";
import { logout } from "../../redux/slices/auth";

export const Header = ({ isAuth }) => {
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm("Вы уверены, что хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
