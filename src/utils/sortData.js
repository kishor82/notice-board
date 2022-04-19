function SortData(newData, sortBy, direction) {
  return newData.sort(function (a, b) {
    if (typeof a[sortBy] == "number") {
      if (direction === "DESC") {
        return b[sortBy] - a[sortBy];
      } else if (direction === "ASC") {
        return a[sortBy] - b[sortBy];
      }
    } else {
      var nameA = a[sortBy].toUpperCase();
      var nameB = b[sortBy].toUpperCase();
      if (direction === "DESC") {
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
      if (direction === "ASC") {
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      }
    }
  });
}
export default SortData;
