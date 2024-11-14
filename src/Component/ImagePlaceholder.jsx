import { Component } from "react";

export class ImagePlaceholder extends Component {
  render() {
    return (
      <div className="d-flex justify-content-end">
        <div
          className="mb-4"
          style={{
            border: "1px dashed black",
            width: "35mm",
            height: "45mm",
          }}
        />
      </div>
    );
  }
}
