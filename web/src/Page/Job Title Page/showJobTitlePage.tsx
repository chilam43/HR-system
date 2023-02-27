import { Modal, Group, Button, createStyles } from "@mantine/core";
import React, { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";

export function JobTitlePage() {
  ///////Inside  Modal///////
  const [inpputtye, setinputtype] = useState({
    type: "",
    departmentId: "",
  });
  const [departmentID, setdepartmentID] = useState<any[]>([]);

  async function loadDepartmentID() {
    let rawresult: any = await fetch(
      import.meta.env.VITE_SERVER_API + "/job-title/getDepartmentid",
      {
        method: "Get",
      }
    );
    let result = await rawresult.json();

    setdepartmentID(result);
  }
  useEffect(() => {
    loadDepartmentID();
  }, []);

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
      borderBottom: `1px solid ${theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[3]
        }`,
    },
    table: {
      maxWidth: 1800,
      width: "100%",
      marginTop: 25,
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

  ///////Inside  Modal///////
  const { classes } = useStyleTable();
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [result, setResult] = useState<any>();
  const handleRowSelected = React.useCallback(
    (state: { selectedRows: any }) => {
      setSelectedRows(state.selectedRows);
    },
    []
  );
  const [opened, setOpened] = useState(false);
  const customStyles = {
    headCells: {
      style: {
        fontSize: "15px",
        marginRight: "0px",
        marginLeft: "0px",
        paddingLeft: "0px",
        paddingRight: "0px",
        width: "5px",
      },
    },
    cells: {
      style: {
        fontSize: "15px",
        marginRight: "0px",
        marginLeft: "0px",
        paddingLeft: "0px",
        paddingRight: "0px",
        width: "fit-content",
      },
    },
  };

  const columns = [
    {
      Width: "5px",

      name: "ID",
      selector: (row: any) => row.id,
    },
    {
      Width: "5px",

      name: "Department Name",
      selector: (row: any) => row.job_title_type,
    },
    {
      Width: "5px",

      name: "Who is the head",
      selector: (row: any) => row.father_department_id,
    },
  ];
  async function getJobTitle() {
    let res: any = await fetch(
      import.meta.env.VITE_SERVER_API + "/job-title/getAllJobTitle"
    );
    let jobTitleFromDB = await res.json();

    setResult(jobTitleFromDB);
  }
  useEffect(() => {
    getJobTitle();
  }, []);
  return (
    <Group className={classes.body}>
      <div className={classes.header}>
        <Group>
          <h2>Job Title</h2>
        </Group>
      </div>
      <Modal size="auto" opened={opened} onClose={() => setOpened(false)}>
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            await fetch(
              import.meta.env.VITE_SERVER_API + "/job-title/createNewJobTitle",
              {
                method: "Post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inpputtye),
              }
            );

            setOpened(false);
            getJobTitle();
          }}
        >
          <div>
            <div>Type</div>
            <br />
            <input
              required
              value={inpputtye.type}
              onChange={(e) => {
                setinputtype({ ...inpputtye, type: e.currentTarget.value });
              }}
              name="type"
              id="type"
              type="text"
              placeholder="Job Title"
            ></input>
          </div>

          <br></br>
          <div>
            <div>JobTitle ID</div>
            <br />

            <select
              required
              value={inpputtye.departmentId}
              onChange={(e: any) =>
                setinputtype({
                  ...inpputtye,
                  departmentId: e.currentTarget.value,
                })
              }
            >
              <option value="" disabled hidden>
                {" "}
                Select a type{" "}
              </option>
              {departmentID.map((v) => (
                <option value={v.id}> {v.department_name} </option>
              ))}
            </select>
          </div>
          <br></br>

          <div>
            <Button
              type="submit"
              onClick={() => {
                loadDepartmentID();
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
      <Group className={classes.table}>
        <Button onClick={() => setOpened(true)}>Add New Job Title</Button>
        <DataTable
          columns={columns}
          data={result}
          customStyles={customStyles}
          onSelectedRowsChange={handleRowSelected}
        />
      </Group>
      <Group position="center"></Group>
    </Group>
  );
}
