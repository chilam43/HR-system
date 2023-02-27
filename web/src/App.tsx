import "./App.css";
import { NavbarNested } from "./components/sideBar/SideBar2";
import Dashboard from "./Page/Dashboard Page/dashboard";
import { Route, Routes } from "react-router-dom";
import { ApplyDayOff } from "./Page/ Leave Pages/applydayoffPage";
import { DayoffPending } from "./Page/ Leave Pages/showDayoffApplicationPage";
import { DayoffType } from "./Page/ Leave Pages/showDayoffTypePage";
import { StaffsList } from "./Page/Staff Pages/StaffsList";
import { NewEmployee } from "./Page/Staff Pages/newEmployee";
import { Login } from "./Page/loginPages/login";
import EmployeeInfoForm from "./Page/Staff Pages/EmployeeFunction";
import { EmployeeInfoEdit } from "./Page/Staff Pages/EmployeeInfoEdit";
//redux
import { IRootState, store } from "./store/store";
import { Provider, useSelector } from "react-redux";
// import { JobTitle } from "./Page/Job Title Page/jobTitlePage";
import { JobTitlePage } from "./Page/Job Title Page/showJobTitlePage";
import { ApplyClaimFormPage } from "./Page/Claims Page/applyClaimFormPage";
import { DepartmentPage } from "./Page/departmentPage/DepartmentPage";
import { ShowClaimFormPending } from "./Page/Claims Page/showClaimFormApplicationPage";
import { ShowClaimFormStatus } from "./Page/Claims Page/showClaimFormStatus";
import { GetCheckInOutRecord } from "./Page/Check in Page/showCheckInOutRecord";

// "@types/styled-components": "^5.1.26",
export interface information {
  id: string;
  name: string;
  department: string;
  jobTitle: string;
  email: string;
  employDate: string;
  status: string;
}

export interface userId {
  id: string;
}

function App() {
  const user = useSelector((state: IRootState) => state.user.user); //access_level_id

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/" element={<NavbarNested />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {user && user.access_level_id && [1].includes(user.access_level_id) && (
          <Route path="/departments" element={<DepartmentPage />} />
        )}
        {user &&
          user.access_level_id &&
          [1, 2, 3].includes(user.access_level_id) && (
            <Route path="/ShowInOutRecord" element={<GetCheckInOutRecord />} />
          )}
        {user && user.access_level_id && [1].includes(user.access_level_id) && (
          <Route path="/employees" element={<StaffsList />} />
        )}

        {user && user.access_level_id && [1].includes(user.access_level_id) && (
          <Route
            path="/employees/create-new-employee"
            element={<EmployeeInfoForm mode={"create"} id={[{ id: "" }]} />}
          />
        )}

        {user && user.access_level_id && [1].includes(user.access_level_id) && (
          <Route path="/employees/:id" element={<EmployeeInfoEdit />} />
        )}

        {user &&
          user.access_level_id &&
          [1, 2, 3].includes(user.access_level_id) && (
            <Route path="/apply-day-off" element={<ApplyDayOff />} />
          )}

        {user &&
          user.access_level_id &&
          [1, 2, 3].includes(user.access_level_id) && (
            <Route
              path="/show_dayoff_application"
              element={<DayoffPending />}
            />
          )}

        {user && user.access_level_id && [1].includes(user.access_level_id) && (
          <Route path="/show_dayoff_type" element={<DayoffType />} />
        )}

        {user && user.access_level_id && [1].includes(user.access_level_id) && (
          <Route path="/job_title" element={<JobTitlePage />} />
        )}

        {user && user.access_level_id && [1].includes(user.access_level_id) && (
          <Route
            path="/employee-info"
            element={<NewEmployee />}
          />
        )}
        {user &&
          user.access_level_id &&
          [1, 2, 3].includes(user.access_level_id) && (
            <Route path="/apply-claim-form" element={<ApplyClaimFormPage />} />
          )}
        {user &&
          user.access_level_id &&
          [1, 2].includes(user.access_level_id) && (
            <Route
              path="/ShowClaimFormPending"
              element={<ShowClaimFormPending />}
            />
          )}
        {user &&
          user.access_level_id &&
          [1, 2, 3].includes(user.access_level_id) && (
            <Route
              path="/ShowClaimFormStatus"
              element={<ShowClaimFormStatus />}
            />
          )}
      </Route>
    </Routes>
  );
}

export default App;
