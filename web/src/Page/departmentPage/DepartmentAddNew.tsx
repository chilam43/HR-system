import { Box, Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import {
  fetchServerData,
  fetchServerDataNonGet,
} from "../../../utilis/fetchDataUtilis";

function DepartmentAddNew({ closeModal }: { closeModal: Function }) {
  const [departmentValues, setDepartmentValue] = useState<string[]>([]);

  const departmentName = async () => {
    const res = await fetchServerData("/department/list");
    const departmentEdited = res.map((v: any) => ({
      label: v.department_name,
      value: v.id,
    }));
    setDepartmentValue(departmentEdited);
  };

  async function sendData(data: any) {
    const res = await fetchServerDataNonGet("/department/create", "POST", {
      data,
    });

    closeModal();
    return res;
  }

  useEffect(() => {
    departmentName();
  }, []);

  const form = useForm({
    initialValues: {
      departmentName: "",
      parentDepartment: "",
    },
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit((value) => sendData(value))}>
        <TextInput
          label="Department"
          placeholder="Department"
          {...form.getInputProps("departmentName")}
        ></TextInput>

        <Select
          searchable
          clearable
          label="Parent Department"
          placeholder="Parent Department"
          data={departmentValues}
          {...form.getInputProps("parentDepartment")}
        />
        <Button type="submit" mt="md">
          Create
        </Button>
      </form>
    </Box>
  );
}

export default DepartmentAddNew;
