import { useEffect, useState } from "react"
import { fetchServerDataNonGet } from "../../../utilis/fetchDataUtilis"
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import DataTable from "react-data-table-component";

export function GetCheckInOutRecord() {
    let user = useSelector((state: IRootState) => state.user.user); //access_level_id


    async function fetchResult(userID: any) {
        let result = await fetchServerDataNonGet("/checkin/getRecord", "POST", { userID })
        setInOutRecord(result)
    }

    useEffect(() => {
        fetchResult(user!.id)
    }, [])

    const [InOutRecord, setInOutRecord] = useState<any>()
    const columns = [
        {
            name: 'Staff id',
            selector: (row: any) => row.staff_id,

        },
        {
            name: 'Check in time',
            selector: (row: any) => row.created_at,

        },
        {
            name: 'Check out time ',
            selector: (row: any) => row.updated_at,
        },

    ];
    return (

        <>
            <DataTable
                columns={columns}
                data={InOutRecord}

            />

        </>
    )
}