import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
} from "@mantine/core";

import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { fetchServerDataNonGet } from "../../../utilis/fetchDataUtilis";
import { login } from "../../store/UserSlice";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]}`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export function Login() {
  const { classes } = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();


  async function submitLogin() {
    let ans = await fetchServerDataNonGet("/auth/login", "POST", {
      email,
      password,
    });

    if (!ans.status) {
      showNotification({
        title: "Login Failed",
        message: ans.message,
        color: "red",
      });
    } else {
      localStorage.setItem("token", ans.token);
      navigate("/dashboard");
      dispatch(login(ans.token));
    }
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          Welcome back to { }!
        </Title>

        <TextInput
          label="Email Address"
          placeholder="your@gmail.com"
          size="md"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button
          fullWidth
          mt="xl"
          size="md"


          onClick={() => {
            submitLogin();
          }}
        >
          Login
        </Button>
      </Paper>
    </div>
  );
}
