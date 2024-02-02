const _ = require('lodash')
const json2xls = require('json2xls')
const fs = require('fs')
const axios = require('axios')
var XLSX = require('xlsx')
//get events ids
var workbook = XLSX.readFile('eventsmh5.xlsx') //50 000 records
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

//get dataelements
var workbook1 = XLSX.readFile('dataelements.xlsx') //50 000 records
var sheet_name_list1 = workbook1.SheetNames;
var xlData1 = XLSX.utils.sheet_to_json(workbook1.Sheets[sheet_name_list1[0]])

//source URLs
var source_baseurl ="http://dhis2.bantwanamw.org:1010/trouble"
var source_username = "blessings"
var source_password = "Blessings_20"

//target URLs
var target_baseurl ="http://dhis2.bantwanamw.org:4040/update"
var target_username = "blessings"
var target_password = "Blessings_20"

_.each(xlData, function (item1,i) {

  //create variables
  var event_id = ""


        //get the data variables
        event_id = item1.Event

        //write the payloa5
        var source_url = source_baseurl+"/api/33/events/"+event_id
        var target_url = target_baseurl+"/api/33/events/"+event_id

        //create the payload

//send the data
const axios = require('axios')

axios
  .get(source_url,{
auth: {
    username: source_username,
    password: source_password
  }
})
  .then(res => {
    //console.log(`statusCode: ${res.statusCode}`)
    //console.log(res.data)
    var generated_payload= res.data
    //console.log(generated_payload)
    //console.log("i am logging now")
    var length = res.data.dataValues.length
    var first_value = res["data"]["dataValues"][1]["dataElement"]
    //console.log(first_value)
    //console.log(length)

  for (var i = 0; i < generated_payload.dataValues.length; i++) {
    //get the variables
    var got_dataelement_id = generated_payload["dataValues"][i]["dataElement"]
    var read_dataelement
    var new_dataelement

    //change the data elements
     //console.log(xlData1)
     for (var j = 0; j < xlData1.length; j++) {
       read_dataelement = xlData1[j]["old"]
       if (got_dataelement_id === read_dataelement) {
         new_dataelement = xlData1[j]["new1"]
         //break;
       }

     }

     generated_payload["dataValues"][i]["dataElement"] = new_dataelement
    //end of change data element

}

console.log(generated_payload)
      //send the payload


      axios
        .put(target_url,generated_payload,{
      auth: {
          username: target_username,
          password: target_password
        }
      })
        .then(res => {

      //echo the results
      console.log(res)


        })
        .catch(error => {
          console.error(error)
        })


      //end of send the payload


  })
  .catch(error => {
    console.error(error)
  })
})
