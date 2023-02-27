import { Button } from "@mantine/core";
import { useEffect, useState } from "react";

export function JobTitle() {
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

  return (
    <div style={{ margin: "50px" }}>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          await fetch(import.meta.env.VITE_SERVER_API + "/leave/addDayofftype", {
            method: "Post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inpputtye),
          });

          window.location.reload();
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

        <div style={{ border: "black solid 10px" }}>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
