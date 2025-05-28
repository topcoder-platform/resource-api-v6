function binarySearch(arr, targetId) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midId = arr[mid].userId || arr[mid].id;
      if (midId === targetId) return arr[mid];
      if (midId < targetId) left = mid + 1;
      else right = mid - 1;
    }
    return null;
  }
  
  function validateFields(dbItem, inputItem, fields) {
    const mismatches = [];
  
    for (const field of fields) {
      const dbVal = dbItem[field] ?? '';
      const inputVal = inputItem[field] ?? '';
      if (typeof dbVal === 'number' && typeof inputVal === 'string') {
        if (dbVal !== parseFloat(inputVal)) mismatches.push(field);
      } else if ((dbVal || '').toString().trim() !== (inputVal || '').toString().trim()) {
        mismatches.push(field);
      }
    }
  
    return mismatches;
  }
  
  module.exports = {
    binarySearch,
    validateFields
  };
  