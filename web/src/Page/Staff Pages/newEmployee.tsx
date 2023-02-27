import { Container, createStyles } from "@mantine/core";
import EmployeeInfoForm from "./EmployeeFunction";

const useStyleTable = createStyles((theme) => ({
  body: {
    marginLeft: 600,
    display: "block",
  },
}));

export function NewEmployee() {
  const { classes } = useStyleTable();

  return (
    <Container className={classes.body}>
      <EmployeeInfoForm mode={"create"} id={null} />
    </Container>
  );
}
