import "./dash.css";
import DashboardScheduler from "../../components/DashboardCalendar/DashboardScheduler";
import { Button, createStyles, Group } from "@mantine/core";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { IconDatabase } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import { fetchServerDataNonGet } from "../../../utilis/fetchDataUtilis";
import { useState } from "react";

const useStyleTable = createStyles((theme) => ({
  body: {
    marginLeft: 40,
    display: "block",
  },
  header: {
    height: 50,
    maxHeight: 50,
    width: "100%",
    marginTop: 25,
    justifyContent: "space-between",
    paddingBottom: 75,
    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },
  table: {
    width: "100%",
    justifyContent: "center",
  },
  date: {
    marginTop: 30,
    justifyContent: "center",
    color: theme.colors.light,
  },
  button: {
    marginTop: 20,
    backgroundColor: theme.colors.teal[4],
    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },
}));

export default function Dashboard() {
  const [checkInResult, setCheckInResult] = useState<string>("");
  const user = useSelector((state: IRootState) => state.user.user); // redux
  const { classes } = useStyleTable();

  async function CheckInOut(InOrOut: any, userID: any) {

    let result = await fetchServerDataNonGet(
      "/checkin" + `/${InOrOut}`,
      "POST",
      { userID }
    );

    {
      result == "Success"
        ? setCheckInResult("success")
        : setCheckInResult("fail");
    }
  }
  return (
    <Group className={classes.body}>
      <Group className={classes.header}>
        <div>
          <h1>Hello {user!.name} </h1>
        </div>
      </Group>
      <div className={classes.date}>
        <h2>Scheduler</h2>
        <DashboardScheduler />
      </div>
      <Group className={classes.table}>
        <Button
          size="lg"
          leftIcon={<IconDatabase size={14} />}
          className={classes.button}
          onClick={() => {
            CheckInOut("in", user!.id);

            {
              checkInResult == "success"
                ? showNotification({
                  message: "Success",
                })
                : showNotification({
                  message: "Success",
                });
            }
          }}
        >
          Check In
        </Button>
        <Button
          size="lg"
          leftIcon={<IconDatabase size={14} />}
          className={classes.button}
          onClick={() => {
            CheckInOut("out", user!.id);

            showNotification({
              message: "Success",
            });
          }}
        >
          Check Out
        </Button>
      </Group>
    </Group>
  );
}
