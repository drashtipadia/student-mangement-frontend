import img1 from "../styles/collegelogo.jpeg";
import img2 from "../styles/naaclog.jpeg";
import { Badge } from "../Component/Badge";
/* eslint-disable react/prop-types */
export function DocHeader({ title, serialNo, docDate }) {
  let currentDate = new Date();
  currentDate =
    currentDate.getDate() +
    "/" +
    currentDate.getMonth() +
    "/" +
    currentDate.getFullYear();

  return (
    <>
      <header>
        <div className="flex  place-content-evenly">
          <img src={img1} alt="collegelogo" className="size-[150px]" />
          <div className="text-center">
            <small className="m-0">
              Managed by Shree Jetpur Kelavni Mandal Trust (since: June 1972)
            </small>
            <p className="text-2xl font-semibold m-0">
              Shree G.K. & C.K. Bosamia Arts & Commerce College{" "}
            </p>
            <small className="m-0">
              Post Box No.20, Junagadh road, Jetpur. No-220356, 227356
            </small>
            <br />
            <small className="m-0">
              website: www.bosamiacollege.org &nbsp; email:
              gkck.college@gmail.com
            </small>
          </div>
          <img src={img2} alt="naaclogo" className="size-[150px]" />
        </div>
      </header>

      <hr />
      <div className="flex pb-7 px-6 pt-2 justify-between">
        <Badge>{serialNo}</Badge>

        <span className="text-end">Date: {docDate || currentDate}</span>
      </div>
      <h1 className="text-center text-4xl ">{title}</h1>
    </>
  );
}
