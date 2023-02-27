import {
  Button,
  createStyles,
  Drawer,
  Group,
  Modal,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { fetchServerData } from "../../../utilis/fetchDataUtilis";
import DepartmentAddNew from "./DepartmentAddNew";
import DepartmentOrgChart from "./DepartmentOrgChart";

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
    paddingBottom: 75,
    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },
  table: {
    maxWidth: 1800,
    width: "100%",
    marginTop: 20,
    display: "flex",
    alignItems: "top",
    justifyContent: "end",
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.md,
  },
  button: {
    marginBottom: 8,
  },
}));

export function DepartmentPage() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openOrgChart, setOpenOrgChart] = useState(false);
  const { classes } = useStyleTable();
  const theme = useMantineTheme();
  const [department, setDepartment] = useState([
    {
      id: "",
      department_name: "",
      father_department_id: "",
      father_department_name: "",
    },
  ]);

  const fetchDepartment = async () => {
    const res = await fetchServerData("/department/list");

    let fatherName = res.map((v: any) => {
      let father = res.find(
        (son: any) => son.id == v.father_department_id
      )?.department_name;
      return {
        ...v,
        father_department_name: father,
      };
    });
    setDepartment(fatherName);
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  useEffect(() => {
  }, [department]);

  function refreshDepartment() {
    setOpenCreateModal(false);
    fetchDepartment();
  }

  const columns = [
    {
      name: "ID",
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: "Department Name",
      selector: (row: any) => row.department_name,
      sortable: true,
    },
    {
      name: "Parent Department",
      selector: (row: any) => {
        if (row.father_department_name == null || undefined) {
          return "Is Me!!!";
        } else {
          return row.father_department_name;
        }
      },

      sortable: true,
    },
  ];

  return (
    <Group className={classes.body}>
      <div className={classes.header}>
        <Group>
          <h2>All Department</h2>
        </Group>
      </div>

      <div>
        <Group className={classes.table}>
          <Button
            className={classes.button}
            onClick={() => setOpenCreateModal(true)}
          >
            Create New Department
          </Button>
          <Button
            className={classes.button}
            onClick={() => setOpenOrgChart(true)}
          >
            View Chart
          </Button>

          <DataTable
            columns={columns}
            data={department}
            pagination
            pointerOnHover
          />
        </Group>
      </div>

      <Drawer
        position="right"
        size="xl"
        padding="xl"
        opened={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        title="Create New Department"
        overlayColor={theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <DepartmentAddNew closeModal={refreshDepartment} />
      </Drawer>

      <Modal
        opened={openOrgChart}
        onClose={() => setOpenOrgChart(false)}
        fullScreen
      >
        <DepartmentOrgChart />
      </Modal>
    </Group>
  );
}
