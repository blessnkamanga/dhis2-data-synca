const { default: axios } = require('axios')
const data_sync = require('./hmis_data_sync')


var baseurl ="http://41.87.6.40:8080/hmistest"
var username = "yambansokausiwa"
var password = "Bscinf-07"

const dataSet_id = 'bx25idVxi1S'

const dataDates = [
    { startDate: "2023-09-01", endDate: "2023-09-30" },
    { startDate: "2023-10-01", endDate: "2023-10-31" },
    { startDate: "2023-11-01", endDate: "2023-11-30" },
    { startDate: "2023-12-01", endDate: "2023-12-31" },
    { startDate: "2024-01-01", endDate: "2024-01-31" },
    { startDate: "2024-02-01", endDate: "2024-02-29" },
  ];
const endPoint = `${baseurl}/api/29/dataSets/${dataSet_id}.json`
//fetching dataSet 
async function getDataSet(){
await axios.get(endPoint,{
    auth: {
        username: username,
        password: password
      }
    }).then(res =>{
        //dataset Org Units
        const dataSetOu = res.data.organisationUnits;
        
        for(let i = 0 ; i < dataSetOu.length; i++){
            for(let x = 0; x < dataDates.length; x++){
                data_sync(dataSet_id,dataSetOu[i].id,dataDates[x].startDate,dataDates[x].endDate)
            }            
        }
    }).catch(e => console.log(e))
}

getDataSet()
//data_sync('bx25idVxi1S','W2hyI8SrvoG')