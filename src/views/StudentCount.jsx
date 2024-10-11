import { useState, useEffect } from 'react'
import React from 'react'
import { Header } from '../Component/Header'
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { safeFetch } from "../utils";
import { TableRow } from "../Component/TableRow";
import { GIA_STREAMS } from '../utils/constants';

export default function StudentCount() {


    const INSTITUTE_TYPE = localStorage.getItem("token");




    let SFICount = {
        GENERAL: [0, 0, 0, 0, 0, 0],
        SC: [0, 0, 0, 0, 0, 0],
        ST: [0, 0, 0, 0, 0, 0],
        'SEBC(OBC)': [0, 0, 0, 0, 0, 0],
        PH: [0, 0, 0, 0, 0, 0],
        'EX-ARMY': [0, 0, 0, 0, 0, 0],
        EWS: [0, 0, 0, 0, 0, 0],
        total: [0, 0, 0, 0, 0, 0],
    }
    let GIACount = {
        GENERAL: [0, 0, 0, 0],
        SC: [0, 0, 0, 0],
        ST: [0, 0, 0, 0],
        'SEBC(OBC)': [0, 0, 0, 0],
        PH: [0, 0, 0, 0],
        'EX-ARMY': [0, 0, 0, 0],
        EWS: [0, 0, 0, 0],
        total: [0, 0, 0, 0],
    };

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        (async () => {
            const [res, err] = await safeFetch(
                `http://${SERVER_HOST}:${SERVER_PORT}/students/${INSTITUTE_TYPE}`,
            );
            if (err != null) console.log(err);
            else {
                setRecords([...res.students]);
                // setRecordsCopy([...res.students]);
                setLoading(false);
            }
        })();

        // eslint-disable-next-line
    }, []);
    if (!loading) {
        records.forEach(val => {
            // switch (val.stream) {
            //     case 'Bachelor of Computer Application':
            //         studentCount.bca += 1; break;
            //     case 'Master of Science (Information Technology & Computer Application)':
            //         studentCount.mscit += 1; break;
            //     case 'Bachelor of Business Administration':
            //         studentCount.bba += 1; break;
            //     default: throw new Error(`undefined Stream: ${val.stream}`);
            // }
            let streamIdx = 0;
            let genderIdx = 0;


            switch (val.stream) {
                case 'Bachelor of Computer Application':
                    streamIdx = 0; break;
                case 'Bachelor of Business Administration':
                    streamIdx = 2; break;
                case 'Master of Science (Information Technology & Computer Application)':
                    streamIdx = 4; break;
                case 'Bachelor of Arts':
                    streamIdx = 0; break;
                case 'Bachelor of Commerce':
                    streamIdx = 2; break;
                default: throw new Error(`undefined Stream: ${val.stream}`);
            }
            // console.log(val);
            if (val.student_gender === 'male') {
                genderIdx = 0;
            } else {
                genderIdx = 1;
            }

            if (val.institute_type === "GIA") {
                GIACount[val.caste][streamIdx + genderIdx] += 1;
                GIACount['total'][streamIdx + genderIdx] += 1;
            }
            else {
                SFICount[val.caste][streamIdx + genderIdx] += 1;
                SFICount['total'][streamIdx + genderIdx] += 1;
            }
        });

        // console.log(GIACount, SFICount);
        console.log(GIACount['total']);


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
                        <tr className='text-center'>
                            <td></td>
                            <td colSpan="6" className='fw-bold'>Stream</td>
                        </tr>
                        <tr className='fw-bold'>
                            <td>Category</td>
                            {INSTITUTE_TYPE === 'SFI' ? <>
                                <td>BCA Male</td>
                                <td>BCA Female</td>
                                <td>BBA Male</td>
                                <td>BBA Female</td>
                                <td>MSC Male</td>
                                <td>MSC Female</td></>
                                : <>
                                    <td>BA Male</td>
                                    <td>BA Female</td>
                                    <td>BCOM Male</td>
                                    <td>BCOM Female</td>
                                </>}
                        </tr>
                    </thead>
                    <tbody>
                        {/* {recordsCopy &&
                            recordsCopy.map((e) => {
                                // console.log(e);
                                return <TableRow data={e} key={e.id} />;
                            })} */}
                        {/* INSTITUTE_TYPE === "GIA" ? GIACount : SFICount */}
                        {Object.entries(INSTITUTE_TYPE === "GIA" ? GIACount : SFICount).map(([k, entry]) => {
                            return <>
                                <TableRow data={entry} key={k} before defValue='0'  >{k}</TableRow>
                            </>;
                        })}
                    </tbody>
                </table>
            </div>

        </>
    )
}

