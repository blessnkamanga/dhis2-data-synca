const { default: axios } = require('axios')
const data_sync = require('./hmis_data_sync')


var baseurl ="http://41.87.6.40:8080/hmistest"
var username = "yambansokausiwa"
var password = "Bscinf-07"

const dataSet_id = 'bx25idVxi1S'

const endPoint = `${baseurl}/api/29/dataSets/${dataSet_id}.json`
console.log(endPoint)
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
            data_sync(dataSet_id,dataSetOu[i].id)
        }
    }).catch(e => console.log(e))
}

getDataSet()
//data_sync('bx25idVxi1S','W2hyI8SrvoG')