import { useEffect, useState } from "react";
import {
  fetchServerData,
  fetchServerDataNonGet,
} from "../../../utilis/fetchDataUtilis";
import {
  Group,
  createStyles,
} from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons";
import DataTable from "react-data-table-component";
import React from "react";

// TRUNCATE dayoff_type  RESTART IDENTITY;/////  ****************

type Dayoff = {
  id?: string;
};
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

export function ShowClaimFormStatus() {
  const { classes } = useStyleTable();
  const [result, setResult] = useState<any>();

  useEffect(() => {
    getAll();
  }, []);

  // /////// if status  == approved  || rejected  , item cannot be selected ///////
  const rowDisabledCriteria = (row: any) =>
    row.status == "approved" || row.status == "rejected";

  async function getAll() {
    let res = await fetchServerData("/claim-form/allClaimForms");

    setResult(res);
  }
  /////////////////below is accept /////////////////

  const fetchdata = async () => {
    try {
      let res = await fetchServerData("/claim-form/allClaimForms");
      return res

      setResult(res);
    } catch (error) {
      return error
    }
  };

  async function setRejectItem(id: string | number) {
    await fetchServerDataNonGet("/claim-form/reject", "PATCH", { id: id });
    await fetchdata();
  }

  async function setAcceptedItem(id: string | number) {
    await fetchServerDataNonGet("/claim-form/accept", "PATCH", { id: id });
    await fetchdata();
  }

  ///////////-----------------toggle search ends  here  -------/////////////////
  const columns = [
    {
      maxWidth: "1px",
      name: "id",
      selector: (row: any) => row.id,
    },
    {
      maxWidth: "1px",
      name: "pic",
      selector: (row: any) => (
        <img
          src={import.meta.env.VITE_SERVER_API + "/" + row.pic}
          width="50px"
        />
      ),
    },
    {
      maxWidth: "1px",
      name: "Name",
      selector: (row: any) => row.user_name,
    },
    {
      maxWidth: "1px",
      name: "Type",
      selector: (row: any) => row.type,
    },
    {
      maxWidth: "1px",
      name: "Date",
      selector: (row: any) => row.date,
    },
    {
      maxWidth: "1px",
      name: "remark",
      selector: (row: any) => row.remark,
    },
    {
      maxWidth: "1px",
      name: "Status",
      selector: (row: any) => row.status,
    },
  ];

  return (
    <Group className={classes.body}>
      <div className={classes.header}>
        <Group>
          <h2>Claim Records</h2>
        </Group>
      </div>
      <div>
        <div>
          <Group className={classes.table}>
            <DataTable
              columns={columns}
              data={result}
              pagination
              pointerOnHover
            />
          </Group>
        </div>
      </div>
    </Group>
  );
}
