import React, { useRef } from 'react'
import "../styles/view.css";
import html2canvas from "html2canvas";
import { DocHeader } from "../Component/DocHeader";
import { Header } from '../Component/Header';
import { DocHeader2 } from '../Component/DocHeader2';
import DocFooter from '../Component/DocFooter';

export default function ViewNoObj() {


    // const student = JSON.parse(localStorage.getItem("first-trial-info"));
    const documentRef = useRef(null);
    //if (student == null) {
    //   alert("Student is empty");
    // }


    const handleDownload = () => {
        html2canvas(documentRef.current).then((canvas) => {
            canvas.toBlob((blob) => {
                let data = new FormData();
                //     // temporarily named hello.png. -- Still have to do something about doc name prefix
                data.append("first-trial-doc", blob, "hello.png");
                //     // eslint-diable-next-line

                //     fetch(`http://${SERVER_HOST}:${SERVER_PORT}/upload-first-trial`, {
                //         body: data,
                //         method: "POST",
                //         headers: {
                //             uuid: student.uuid,
                //         },
                //         uuid: student.uuid,
                //     })
                //         .then((res) => res.json())
                //         .then(console.log);

                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = "mynoobj.png";

                a.click();
            });
        });
    };
    return (
        <>

            <Header />

            <div className="container p-0" style={{ height: "297mm", width: "210mm" }} ref={documentRef}>
                <DocHeader2 />
                <section className=' text-center p-5'>
                    <div className=" text-primary" >
                        <h5>No Objection Certificate</h5>
                    </div>
                    <p className="text-end">Date: 22/09/2024 </p>
                    <div>
                        <p className="text-center">This is to certify to that,Mr./Ms.
                            <abbr title="attribute" className='fw-bold'> Patel Aadhya Niketbhai </abbr> last year <span className="h6"> 2021-2022 </span>
                            was studying <span className="h6"> MSCIT </span>
                            in this college.This institution does not have any objection if he/she gets admission to another college  in the current year.
                        </p>
                    </div>

                </section>
                <DocHeader />
                <div className="p-4">
                    <h1 className="text-center">No Objection Certificate</h1>
                    <br />
                    <p className="text-end">Date: 22/09/2024 </p>
                    <div>
                        <p className="text-center">This is to certify to that,Mr./Ms.
                            <abbr title="attribute" className='fw-bold'> Patel Aadhya Niketbhai </abbr> last year <span className="h6"> 2021-2022 </span>
                            was studying <span className="h6"> MSCIT </span>
                            in this college.This institution does not have any objection if he/she gets admission to another college  in the current year.
                        </p>
                    </div>


                </div>
                <DocFooter />
            </div>
            <div className="justify-content-center">
                <button className="btn btn-primary " onClick={handleDownload} >
                    Download
                </button>
            </div>

        </>
    )
}
