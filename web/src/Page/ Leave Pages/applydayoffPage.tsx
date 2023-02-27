import {
  Alert,
  Button,
  Container,
  Group,
  createStyles,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconAlertCircle } from "@tabler/icons";

import { ChangeEvent, useEffect, useState } from "react";

import {
  fetchServerData,
  fetchServerDataForm,
  fetchServerDataNonGet,
} from "../../../utilis/fetchDataUtilis";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
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
    height: "80vh",
    width: "100%",
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

export function ApplyDayOff() {
  const user = useSelector((state: IRootState) => state.user.user); //access_level_id

  const [dayofftype, setdayofftype] = useState<any[]>([]);

  const [from, setFrom] = useState<any>(new Date());
  const [to, setTo] = useState<any>(new Date());
  const [total, setTotal] = useState<any>(0);

  const [info, setInfo] = useState<any>({
    name: user?.name,
    type: "",
    userID: user?.id,
  });

  const [file, setFile] = useState<any>();

  //----------------------------------------------------------------
  async function getdayofftype() {
    let result: any = await fetchServerData("/leave/gettype");

    setdayofftype(result.filter((v: { short_form: any }) => !!v.short_form));
  }

  ////////////////submit file///////////////////////////////
  const handleFileChange = (e?: ChangeEvent<HTMLInputElement>) => {
    if (e?.target.files) {
      setFile(e.target.files[0]);
    }
  };

  ///////load the dayoff type for selection///////////
  useEffect(() => {
    getdayofftype();
  }, []);

  //----------------------------------------------------------------
  useEffect(() => {
    let d1: any = from;
    let d2: any = to;

    let result = d2 - d1;
    let one_day = 1000 * 60 * 60 * 24;

    let totalday = result / one_day;
    let newtotal = Math.ceil(totalday);

    setTotal(newtotal);
  }, [from, to]);

  async function submitfile() {

    const formData = new FormData();
    formData.append("name", info.name);
    formData.append("type", info.type);
    formData.append("from", from);
    formData.append("to", to);
    formData.append("total", total);
    formData.append("userID", info.userID);
    formData.append("file", file);

    const res = await fetchServerDataForm(
      "/leave/application",
      "POST",
      formData
    );

    setFrom("");
    setTo("");
    setInfo({
      name: "",
      type: "",
      reason: "",
    });
    setTotal("");
  }

  const { classes } = useStyleTable();

  useEffect(() => {
  }, [dayofftype]);

  return (
    <Group className={classes.body}>
      <div className={classes.header}>
        <Group>
          <h2>Day-Off Application</h2>
        </Group>
      </div>

      <Group className={classes.table}>
        <Container>

          <h3>For sick leave, please attach doctor'note</h3>
          <div style={{ display: "flex", margin: "20px" }}>
            <div>
              <div style={{ margin: "0px 30px" }}>Employee</div>
              <br />
              <input
                value={info.name}
                onChange={(e) => {
                  setInfo({ ...info, name: e.currentTarget.value });
                }}
                name="employee"
                id="employee"
                type="text"
                placeholder="name"
                style={{ margin: "0px 30px" }}
              ></input>
            </div>

            <div>
              <div style={{ margin: "0px 60px" }}>Dayoff Type</div>
              <br />

              <select
                required
                value={info.type}
                onChange={(e) =>
                  setInfo({ ...info, type: e.currentTarget.value })
                }
                style={{ margin: "0px 60px" }}
              >
                <option value="" selected disabled hidden>
                  {" "}
                  Select a type{" "}
                </option>
                {dayofftype.map((v) => (
                  <option value={v.id}> {v.short_form} </option>
                ))}
              </select>
            </div>

            {info.type == "" ? (
              <Alert
                icon={<IconAlertCircle size={16} />}
                title="Bummer!"
                color="red"
              >
                Please Select a type
              </Alert>
            ) : (
              ""
            )}
          </div>
          <hr />
          <br></br>

          {/**************      From   To   Input  ***********/}
          <div style={{ display: "flex", margin: "5px" }}>
            <div style={{ margin: "0px 40px" }}>
              <div>From</div>
              <br />
              <DatePicker value={from} onChange={setFrom} />
            </div>
            <div>
              <div>To</div>
              <br />
              <DatePicker value={to} onChange={setTo} />
            </div>
          </div>

          <br></br>
          <hr />

          {/************** Show  Number of dayoff day (total)  ***********/}
          <div style={{ display: "flex", margin: "20px" }}>
            <div style={{ margin: "0px 30px" }}>{"Total"}</div>
            <input
              disabled
              value={total}
              onChange={() => {
                setTotal(total);
              }}
              name="total"
              id="total"
              placeholder="number of days"
              type="number"
            ></input>
            <div style={{ paddingLeft: "10px" }}> Day</div>
          </div>

          {/* submit file /////////////////////////////////////// */}
          <div>
            {info.type == 5 && (
              <div style={{ margin: "40px 40px" }}>
                <input type="file" onChange={handleFileChange} />

                <div>{file && `${file.name} - ${file.type}`}</div>
              </div>
            )}
          </div>

          <hr />

          {/*************************  Logic to hide Submit button when totoal day is zero or negative  ************/}
          {total <= 0 || info.type == "" ? (
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="Bummer!"
              color="red"
            >
              Something terrible happened! Bro! Total should not be 0 or a
              negative number!
            </Alert>
          ) : (
            <Container>
              <div style={{ paddingLeft: "700px" }}>
                <div>
                  <Button
                    type="submit"
                    onClick={() => {
                      submitfile();
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Container>
          )}
          {/* total should not be ZERO!!!!!!!!!!!!!!! */}
        </Container>
      </Group>
    </Group>
  );
}
