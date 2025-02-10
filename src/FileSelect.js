import React from "react";
import PropTypes from "prop-types";

class FileSelect extends React.Component {
  constructor(props) {
    super(props);
    this.file = null;
    this.handleShowReport = this.handleShowReport.bind(this);
  }

  handleShowReport() {
    if (!this.file.files || !this.file.files[0]) {
      return;
    }
    this.props.onSubmit(this.file.files[0]);
  }

  render() {
    return (
      <div>
        <p>AWSアクセスキーのCSVファイルを選択してください。</p>
        <input
          type="file"
          className="file"
          ref={(file) => (this.file = file)}
          accept="text/csv"
        />
        <button onClick={this.handleShowReport}>Show Report</button>
      </div>
    );
  }
}
// propTypesの定義
FileSelect.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FileSelect;
