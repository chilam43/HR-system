import { useEffect, useState, ChangeEvent } from "react";
import { zodResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Group,
  Grid,
  Select,
  createStyles,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { z } from "zod";

import {
  fetchServerData,
  fetchServerDataNonGet,
} from "../../../utilis/fetchDataUtilis";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  age: z
    .number()
    .min(18, { message: "You must be at least 18 to create an account" }),
});

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

export type EmployeeInfoFormProps = {
  mode: "create" | "edit";
  data?: any;
  id?: any;
};

export default function EmployeeInfoForm({
  mode,
  data,
  id,
}: EmployeeInfoFormProps) {
  const navigate = useNavigate();

  const { classes } = useStyleTable();
  const [departmentValues, setDepartmentValue] = useState<any[]>([]);
  const [jobTitleValues, setJobTitleValues] = useState<any[]>([]);
  const [accessLevelValues, setAccessLevelValues] = useState<any[]>([]);

  const departmentName = async () => {
    const res = await fetchServerData("/department/list");
    const departmentEdited = res.map((v: any) => ({
      label: v.department_name,
      value: v.id,
    }));
    setDepartmentValue(departmentEdited);
  };

  const getJobTitle = async () => {
    const res = await fetchServerData("/job-title/getAllJobTitle");
    const jobTitleEdited = res.map((v: any) => ({
      label: v.job_title_type,
      value: v.id,
      group: v.department_name,
    }));
    setJobTitleValues(jobTitleEdited);
  };

  const accessLevel = async () => {
    const res = await fetchServerData("/access-level/list");
    const accessLevelEdited = res.map((v: any) => ({
      label: v.access_level_type,
      value: v.id,
    }));
    setAccessLevelValues(accessLevelEdited);
  };

  useEffect(() => {
    departmentName();
    accessLevel();
    getJobTitle();
  }, []);

  const employeeInfoForm = async function EmployeeInfoForm() {
    if (mode === "create") {
      const dataFromDB = await fetchServerDataNonGet(
        "/employees/create",
        "POST",
        state
      );

      navigate(-1);
      return dataFromDB;
    }
    else if (mode === "edit") {
      const dataFromDB = await fetchServerDataNonGet(
        `/employees/update/${id}`,
        "POST",
        state
      );

      navigate("/employees");
      return dataFromDB;
    }
  };

  const [fileContract, setFileContract] = useState<File>();
  const [fileMpf, setFileMpf] = useState<File>();

  const [state, setState] = useState({
    header: mode === "create" ? "Create New Employee" : "Employee Info",
    fetch: mode === "create" ? "register" : "Edit",
    name: mode === "create" ? "" : data ? data.name : "",
    gender: mode === "create" ? "" : data ? data.gender : "",
    email: mode === "create" ? "" : data ? data.email : "",
    address: mode === "create" ? "" : data ? data.address : "",
    job_nature: mode === "create" ? "" : data ? data.job_nature : "",
    password: mode === "create" ? "" : data ? data.password : "",
    contract: mode === "create" ? "" : data ? data.contract : "",
    mpf: mode === "create" ? "" : data ? data.mpf : "",
    birthday: mode === "create" ? "" : data ? new Date(data.birthday) : "",
    employ_date:
      mode === "create" ? "" : data ? new Date(data.employ_date) : "",
    termination_date:
      mode === "create" ? "" : data ? new Date(data.termination_date) : null,
    working_time: mode === "create" ? "" : data ? data.working_time : "",
    salary: mode === "create" ? "" : data ? data.salary : "",
    annual_leave_fixed:
      mode === "create" ? "" : data ? data.annual_leave_fixed : "",
    sick_leave_fixed:
      mode === "create" ? "" : data ? data.sick_leave_fixed : "",
    bank_account: mode === "create" ? "" : data ? data.bank_account : "",
    phone: mode === "create" ? "" : data ? data.phone : "",
    access_level: mode === "create" ? "" : data ? data.access_level_type : "",
    job_title: mode === "create" ? "" : data ? data.job_title_id : "",
    department: mode === "create" ? "" : data ? data.department_name : "",
    button: mode === "create" ? "Create" : "Update Information",
    validate: zodResolver(schema),
  });

  useEffect(() => {
    setState({
      header: mode === "create" ? "Create New Employee" : "Employee Info",
      fetch: mode === "create" ? "register" : "Edit",
      name: mode === "create" ? "" : data ? data.name : "",

      gender: mode === "create" ? "" : data ? data.gender : "",
      email: mode === "create" ? "" : data ? data.email : "",
      address: mode === "create" ? "" : data ? data.address : "",
      job_nature: mode === "create" ? "" : data ? data.job_nature : "",
      password: mode === "create" ? "" : data ? data.password : "",
      contract: mode === "create" ? "" : data ? data.contract : "",
      mpf: mode === "create" ? "" : data ? data.mpf : "",
      birthday: mode === "create" ? "" : data ? new Date(data.birthday) : "",
      employ_date: mode === "create" ? "" : data ? data.employ_date2 : "",
      termination_date:
        mode === "create" ? "" : data ? data.termination_date2 : "",
      working_time: mode === "create" ? "" : data ? data.working_time : "",
      salary: mode === "create" ? "" : data ? data.salary : "",
      annual_leave_fixed:
        mode === "create" ? "" : data ? data.annual_leave_fixed : "",
      sick_leave_fixed:
        mode === "create" ? "" : data ? data.sick_leave_fixed : "",
      bank_account: mode === "create" ? "" : data ? data.bank_account : "",
      phone: mode === "create" ? "" : data ? data.phone : "",
      access_level: mode === "create" ? "" : data ? data.access_level_id : "",
      job_title: mode === "create" ? "" : data ? data.job_title_id : "",
      department: mode === "create" ? "" : data ? data.department_id : "",
      button: mode === "create" ? "Create" : "Update Information",
      validate: zodResolver(schema),
    });
  }, [data]);

  type FormState = typeof state;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files) {
      if (key === "contract") {
        setFileContract(e.target.files[0]);
      }

      if (key === "mpf") {
        setFileMpf(e.target.files[0]);
      }
    }
  };

  function inputGroup(
    label: string,
    key: keyof FormState,
    type: "text" | "password"
  ) {
    return (
      <Grid.Col span={6} style={{ minHeight: 80 }}>
        <label htmlFor={label}>{label}</label>
        <TextInput
          mt="xl"
          type={type}
          id={key}
          name={key}
          value={state[key]}
          onChange={(e) => setState({ ...state, [`${key}`]: e.target.value })}
        />
      </Grid.Col>
    );
  }

  function selectGroup(
    label: string,
    key: keyof FormState,
    selectArray: { label: any; value: any }[]
  ) {
    return (
      <Grid.Col span={6} style={{ minHeight: 80 }}>
        <label htmlFor={label}>{label}</label>
        <Select
          mt="xl"
          id={key}
          name={key}
          value={state[key]}
          onChange={(e) => setState({ ...state, [`${key}`]: e })}
          data={selectArray}
        />
      </Grid.Col>
    );
  }
  function selectorGroup(
    label: string,
    key: keyof FormState,
    selectArray: { label: any; value: any; group: any }[]
  ) {
    return (
      <Grid.Col span={6} style={{ minHeight: 80 }}>
        <label htmlFor={label}>{label}</label>
        <Select
          mt="xl"
          id={key}
          name={key}
          value={state[key]}
          onChange={(e) => setState({ ...state, [`${key}`]: e })}
          data={selectArray}
        />
      </Grid.Col>
    );
  }

  function inputdate(label: string, key: keyof FormState) {
    return (
      <>
        <Grid.Col span={6} style={{ minHeight: 80 }}>
          <label htmlFor={label}>{label}</label>
          <DatePicker
            mt="xl"
            value={state[key]}
            onChange={(d) =>
              setState({ ...state, [`${key}`]: new Date(d as Date) })
            }
          />
        </Grid.Col>
      </>
    );
  }

  function uploadfile(label: string, key: keyof FormState) {
    return (
      <>
        <Grid.Col span={6} style={{ minHeight: 80 }}>
          <label htmlFor={label}>{label}</label>
          <input type="file" onChange={(e) => handleFileChange(e, key)} />
          {/* <div>{file && `${file.name} - ${file.type}`}</div> */}
        </Grid.Col>
      </>
    );
  }
  return (
    <Group className={classes.body}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Group className={classes.header}>
          <h2>{state.header}</h2>
        </Group>

        <h3>Employee Information</h3>
        <Grid justify="space-between" align="center">
          {inputGroup("Name", "name", "text")}
          {inputdate("Birthday", "birthday")}
          {inputGroup("Gender", "gender", "text")}
          {inputGroup("Email", "email", "text")}
          {inputGroup("Phone", "phone", "text")}
          {inputGroup("Address", "address", "text")}
        </Grid>
        <h3>Job Detail</h3>

        <Grid justify="space-between" align="center">
          {selectGroup("Department", "department", departmentValues)}
          {selectorGroup("Job Title", "job_title", jobTitleValues)}
          {inputGroup("Salary", "salary", "text")}
          {inputGroup("Job Nature", "job_nature", "text")}
          {inputdate("Employ Date", "employ_date")}
          {inputGroup("Sick Leave", "sick_leave_fixed", "text")}
          {inputdate("Termination Date", "termination_date")}
          {inputGroup("Annual Leave", "annual_leave_fixed", "text")}
          {inputGroup("Working Time", "working_time", "text")}
          {inputGroup("Bank Account", "bank_account", "text")}
        </Grid>

        <h3>Log-in Access</h3>
        <Grid justify="space-between" align="center">
          {inputGroup("Password", "password", "password")}
          {selectGroup("Access Level", "access_level", accessLevelValues)}
        </Grid>

        <h3>File</h3>
        <Grid>
          {uploadfile("Contract", "contract")}
          {uploadfile("Mpf", "mpf")}
        </Grid>
        <div></div>
        <div></div>
        <div>
          <Button type="submit" onClick={() => employeeInfoForm()}>
            {state.button}
          </Button>
        </div>
      </form>
    </Group>
  );
}
