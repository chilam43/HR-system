import {
  Navbar,
  Group,
  ScrollArea,
  createStyles,
  Grid,
  Button,
  Popover,
} from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconAssembly,
  IconFileImport,
  IconUsers,
  IconColumnInsertRight,
} from "@tabler/icons";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { IRootState } from "../../store/store";
import { loginOut } from "../../store/UserSlice";
import { LinksGroup } from "./sideBarSetting";
import { UserButton } from "./sideBarSetting2";

const information = [
  { label: "Dashboard", icon: IconGauge, link: "dashboard" },
  {
    label: "Company",
    icon: IconNotes,
    accessList: [1],
    links: [
      { label: "Department", link: "/departments", accessList: [1] },
      { label: "Job Title", link: "/job_title", accessList: [1] },
      { label: "Leave Type", link: "/show_dayoff_type", accessList: [1] },
    ],
  },
  {
    label: "Staffs",
    icon: IconUsers,
    accessList: [1],
    links: [
      {
        label: "Staff List",
        link: "/employees",
        icon: IconNotes,
        accessList: [1],
      },
    ],
  },
  {
    label: "Application",
    icon: IconFileImport,
    links: [
      {
        label: "Leave Application",
        link: "/apply-day-off",
        icon: IconNotes,
      },
      {
        label: "Claim Application",
        link: "/apply-claim-form",
        icon: IconNotes,
      },
    ],
    accessList: [1, 2],
  },
  {
    label: "Request",
    icon: IconColumnInsertRight,
    links: [
      {
        label: "Leave Request",
        link: "/show_dayoff_application ",
        icon: IconNotes,
        accessList: [1, 2, 3],
      },
      {
        label: "Claim Request",
        link: "/ShowClaimFormPending",
        icon: IconNotes,
        accessList: [1, 2],
      },
      { label: "Claim Records", link: "/ShowClaimFormStatus", icon: IconNotes },
    ],
  },
  {
    label: "Records",
    icon: IconCalendarStats,
    links: [
      {
        label: "Check-In",
        link: "/ShowInOutRecord",
        icon: IconNotes,
        accessList: [1, 2, 3],
      },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
    position: "fixed",
    width: "20vw",
  },
  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },
}));

export function NavbarNested() {
  const user = useSelector((state: IRootState) => state.user.user); // redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logOut() {
    dispatch(loginOut());
    navigate("/");
  }

  const { classes } = useStyles();
  const links =
    user?.access_level_id === 3
      ? information
        .filter((info) => info.label !== "Staffs" && info.label !== "Company")
        .map((item) => <LinksGroup {...(item as any)} key={item.label} />)
      : information.map((item) => (
        <LinksGroup {...(item as any)} key={item.label} />
      ));

  return (
    <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
      <Grid.Col span={2}>
        <Navbar width={{ base: 250 }} p="md" className={classes.navbar}>
          <Navbar.Section className={classes.header}>
            <Group position="left">
              <IconAssembly size="45px"></IconAssembly>
              <h2>Dashboard</h2>
            </Group>
          </Navbar.Section>

          <Navbar.Section grow className={classes.links} component={ScrollArea}>
            <div className={classes.linksInner}>{links}</div>
          </Navbar.Section>

          <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Navbar.Section className={classes.footer}>
                {user && (
                  <UserButton
                    image="https://picx.zhimg.com/v2-d705041c29ad988dda1f56e5c6385f03_720w.jpg?source=172ae18b"
                    name={user.name}
                    email={`${user?.email}`}
                  />
                )}
              </Navbar.Section>
            </Popover.Target>

            <Popover.Dropdown>
              <Button
                color="red"
                fullWidth
                onClick={() => {
                  logOut();
                }}
              >
                Log Out
              </Button>
            </Popover.Dropdown>
          </Popover>
        </Navbar>
      </Grid.Col>

      <Grid.Col span={10}>
        <div style={{ marginLeft: "55px" }}>
          <Outlet />
        </div>
      </Grid.Col>
    </Grid>
  );
}

