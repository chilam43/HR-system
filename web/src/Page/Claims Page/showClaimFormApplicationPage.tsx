import { useEffect, useRef, useState } from "react";
import {
  fetchServerData,
  fetchServerDataNonGet,
} from "../../../utilis/fetchDataUtilis";
import {
  Button,
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

export function ShowClaimFormPending() {
  const [selectedRows, setSelectedRows] = React.useState<Dayoff[]>([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [result, setResult] = useState<any>();
  const [query, setQuery] = useState<string>("");
  const [togglesearch, settoggleSearch] = useState<boolean>(true);
  const [searchresult, setSearchresult] = useState<any>();
  const [openedSecondModal, setOpenedSecondModal] = useState(false);
  const { classes } = useStyleTable();

  useEffect(() => {
    getAll();
  }, []);
  ////// table check box   select items ///////////////////////////
  const handleRowSelected = React.useCallback(
    (state: { selectedRows: any }) => {
      setSelectedRows(state.selectedRows);
    },
    []
  );
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
    {
      maxWidth: "1px",
      name: "",

      selector: (row: any) =>
        row.status == "pending" && (
          <Button
            color="red"
            onClick={() => {
              setRejectItem(row.id);
            }}
          >
            Reject
          </Button>
        ),
    },
    {
      maxWidth: "1px",
      name: "",

      selector: (row: any) =>
        row.status == "pending" && (
          <Button
            color="green"
            onClick={() => {
              setAcceptedItem(row.id);
            }}
          >
            accept
          </Button>
        ),
    },
  ];

  return (
    <Group className={classes.body}>
      <div className={classes.header}>
        <Group>
          <h2>Claim Requests</h2>
        </Group>
      </div>
      <div>
        <div>
          <Group className={classes.table}>
            <DataTable columns={columns} data={result} />
          </Group>
        </div>
      </div>
    </Group>
  );
}
