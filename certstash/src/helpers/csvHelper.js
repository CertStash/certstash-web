import Papa from 'papaparse'

export const parseCSV = (csv) => {
  return new Promise( (res, rej) => {
    Papa.parse(csv, {
      header: true,
      complete: csv => {
        res(csv)
      }
    });
  })
}

export const getEmailsFromCSV = (csv) => {
  return new Promise( (res, rej) => {
    const email = new RegExp(/e{1}-*mail{1}/gi);
    const data = csv.data
    if(data.length === 0){
      rej('CSV MUST CONTAIN MORE THAN ONE LINE')
      return
    } 
    const firstRow = data[0]
    
    let emailKey;
    for(let key in firstRow){
      if(email.test(key)){
        emailKey = key;
        break
      }
    }
    
    const emails = data.reduce( (acc, item) => {
      acc.push(item[emailKey])
      return acc
    }, [])
    res(emails)
  })
}