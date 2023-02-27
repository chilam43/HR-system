import {
  TextInput,
  Button,
  Group,
  Box,
  Select,
  FileInput,
  createStyles,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  fetchServerData,
  fetchServerDataForm,
} from "../../../utilis/fetchDataUtilis";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../store/store";

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
    width: "100%",
    marginTop: 25,
    alignItems: "top",
    padding: 30,
    justifyContent: "center",
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.md,
  },
  button: {
    marginBottom: 8,
  },
}));
export function ApplyClaimFormPage() {
  const { classes } = useStyleTable();

  const dispatch = useDispatch<AppDispatch>();

  let user = useSelector((state: IRootState) => state.user.user); //access_level_id

  const form = useForm({
    initialValues: {
      submitTo: "",
      date: "",
      remark: "",
      type: "",
      amount: "",
      reference: "",
    },
    validate: {
      submitTo: (value) => (value ? null : "no submit target"),
      date: (value) => (value ? null : "no Date"),
      remark: (value) => (value ? null : "no Description"),
      type: (value) => (value ? null : "no Expense Category"),
      amount: (value) => (value ? null : "no Amount"),
      reference: (value) => (value ? null : "no reference"),
    },
  });

  const [managerValues, setManagerValue] = useState<string[]>([]);
  const [file, setFile] = useState<File>();

  //--------------------------------submit form----------------------------------------------------------------
  async function submitForm(v: any) {

    const formData = new FormData();
    formData.append("staff_id", user!.id.toString());
    formData.append("submitTo", v.submitTo);
    formData.append("date", v.date);
    formData.append("remark", v.remark);
    formData.append("type", v.type);
    formData.append("amount", v.amount);
    formData.append("file", v.reference[0]);
    let res = await fetchServerDataForm("/claim-form/apply", "POST", formData);

    if (res.result.status) {
      form.reset();
    }
  }

  // -------------------loop manager name list----------------------------------------------------
  const managerName = async () => {
    const res = await fetchServerData("/claim-form/list");

    const departmentEdited = res.map((v: any) => ({
      label: v.users_name,
      value: v.users_id,
      group: v.department_name,
    }));
    setManagerValue(departmentEdited);
  };

  useEffect(() => {
    managerName();
  }, []);

  return (
    <Group className={classes.body}>
      <div className={classes.header}>
        <Group>
          <h2>Claim Applications</h2>
        </Group>
      </div>
      <Box className={classes.table} sx={{ maxWidth: 350 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => submitForm(values))}>
          <Select
            data={managerValues}
            searchable
            withAsterisk
            label="Submit to"
            {...form.getInputProps("submitTo")}
          />

          <TextInput
            withAsterisk
            name="date"
            type="date"
            label="Date"
            max={moment().format("YYYY-MM-DD")}
            {...form.getInputProps("date")}
          />

          <TextInput
            withAsterisk
            name="description"
            type="text"
            label="Remark"
            {...form.getInputProps("remark")}
          />

          <TextInput
            withAsterisk
            name="type"
            type="text"
            label="Type"
            {...form.getInputProps("type")}
          />

          <TextInput
            withAsterisk
            name="amount"
            type="number"
            label="Amount"
            placeholder="$"
            {...form.getInputProps("amount")}
          />

          <FileInput
            placeholder="Pick file"
            label="Reference"
            multiple
            accept="image/png,image/jpeg"
            {...form.getInputProps("reference")}
          />

          <Group position="right" mt="md">
            <Button type="submit" className={classes.button}>
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </Group>
  );
}
