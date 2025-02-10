export function mapArrayToWorkItem(data) {
    const keys = ["ACCESSKEY","SECRETKEY"];
    //const keys = data[0];
    const recs = data.slice(1).map(row =>{
      const entry = {};
      keys.forEach((key, index) => {
        entry[key] = row[index];
      });
      return entry;
    });
    return recs;
}
