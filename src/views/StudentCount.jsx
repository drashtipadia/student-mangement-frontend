import { useState, useEffect } from 'react'
import React from 'react'
import { Header } from '../Component/Header'
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { safeFetch } from "../utils";
import { TableRow } from "../Component/TableRow";

export default function StudentCount() {

    const [studentCount, setStudentCount] = useState({ msc: 0, bba: 0, bca: 0, });
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recordsCopy, setRecordsCopy] = useState([]);

    useEffect(() => {
        (async () => {
            const [res, err] = await safeFetch(
                `http://${SERVER_HOST}:${SERVER_PORT}/students`,
            );
            if (err != null) console.log(err);
            else {
                setRecords([...res.students]);
                setRecordsCopy([...res.students]);
                setLoading(false);
            }
        })();

        // eslint-disable-next-line
    }, []);
    if (records) {

        records.forEach(val => {
            if (val.stream === "Master of Science (Information Technology & Computer Application)") {
                setStudentCount({ ...studentCount, msc: studentCount.msc + 1 })
                return;
            }
        });
        console.log(studentCount);
    }




    return (
        <>
            <Header />
            <div className="container mb-3 bg-light overflow-scroll">
                <table
                    className="table table-bordered"
                    id="my-table"
                // ref={tableRef}
                >
                    <thead>
                        <tr>
                        </tr>
                    </thead>
                    <tbody>
                        {recordsCopy &&
                            recordsCopy.map((e) => {
                                // console.log(e);
                                return <TableRow data={e} key={e.id} />;
                            })}
                    </tbody>
                </table>
            </div>

        </>
    )
}

