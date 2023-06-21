function download(format, ev, data) {
  let contents =
    format === "json"
      ? JSON.stringify(data)
      : data.reduce(function (result, row) {
          return (
            result +
            row.reduce(function (rowresult, cell, idx) {
              return (
                rowresult +
                '"' +
                cell.replace(/"/g, '""') +
                '"' +
                (idx < row.length - 1 ? "," : "")
              );
            }, "") +
            "\n"
          );
        }, "");
  let URL = window.URL || window.webkitURL;
  let blob = new Blob([contents], { type: "text/" + format });
  ev.target.href = URL.createObjectURL(blob);
  ev.target.download = "data." + format;
}

export default download;
