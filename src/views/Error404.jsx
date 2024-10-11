import { useEffect } from "react";

export default function Error404() {
  useEffect(() => { document.title = "Error" })
  return (
    <div className="container">
      <h1 className="text-center">Error 404 Page Not Found</h1>
    </div>
  );
}
