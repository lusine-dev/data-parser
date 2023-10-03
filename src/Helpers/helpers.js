const distinctObjValues = (array, key) => {
    const distinctData = [...new Set(array.map((x) => String(x[key])))];
  
    return distinctData;
};

exports.distinctObjValues = distinctObjValues;
