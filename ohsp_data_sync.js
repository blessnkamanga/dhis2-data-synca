const _ = require('lodash')
const json2xls = require('json2xls')
const fs = require('fs')
const axios = require('axios')
var XLSX = require('xlsx')


//source URLs
var source_baseurl =""
var source_username = ""
var source_password = ""

//target URLs
var target_baseurl =""
var target_username = ""
var target_password = ""

//dataSet

//get current date
 days = 1
// new Date object
let date_ob = new Date();

//last 7 days date object
let date_ob_last_7_days = new Date(date_ob.getTime() - (days * 24 * 60 * 60 * 1000));
// current date
// adjust 0 before single digit date
let day = ("0" + date_ob.getDate()).slice(-2);
let day_past = ("0" + date_ob_last_7_days.getDate()).slice(-2);


// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let month_past = ("0" + (date_ob_last_7_days.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();
let year_past = date_ob_last_7_days.getFullYear();


var period = year+"-"+month+"-"+day
var period_past = year_past+"-"+month_past+"-"+day_past

console.log(period)
console.log("The past period is \n")
console.log(period_past)+""

//period="2021-10-18"

var completedataset = source_baseurl+"/api/completeDataSetRegistrations.json?dataSet=waoQ016uOz1&startDate=2022-10-17&endDate=2022-10-23&orgUnit=XtF7Xzv3edv&children=true"
//var completedataset = source_baseurl+"/api/organisationUnits"


//get the completed datasets
axios
  .get(completedataset,{
auth: {
    username: source_username,
    password: source_password
  }
})
  .then(res => {
    //console.log(res.data)
    var generated_payload= res.data
    for (var i = 0; i < generated_payload.completeDataSetRegistrations.length; i++) {
      //get the variables
      var dataset = generated_payload["completeDataSetRegistrations"][i]["dataSet"]
      var orgunit = generated_payload["completeDataSetRegistrations"][i]["organisationUnit"]
      var period = generated_payload["completeDataSetRegistrations"][i]["period"]

      //console.log(orgunit+" "+dataset+" "+period)

      //get the dataValues
        var datavaluesurl = source_baseurl+"/api/dataValueSets?dataSet="+dataset+"&orgUnit="+orgunit+"&period="+period
      axios
        .get(datavaluesurl,{
      auth: {
          username: source_username,
          password: source_password
        }
      })
        .then(res1 => {
          //console.log(res1)
          var generated_payload= res1.data

          for (var i = 0; i < generated_payload.dataValues.length; i++) {
            //get the variables

             //generated_payload["dataValues"][i]["attributeOptionCombo"] = "HllvX50cXC0" //from HMIS to OHSP

             generated_payload["dataValues"][i]["attributeOptionCombo"] = "Tt7fU5lUhAU" //from OHSP to HMIS
            //end of change data element  HllvX50cXC0

        }


          //var attributeoptioncomboid = res1.data.dataValues["0"]["attributeOptionCombo"]
          console.log(generated_payload)

          //send the data to the servers
            var target_datavaluesurl = target_baseurl+"/api/dataValueSets"
          axios
            .post(target_datavaluesurl,generated_payload,{
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

          //end of send the data to the server 


        })
        .catch(error => {
          console.error(error)
        })

      //end of get the datavalues

       //generated_payload["dataValues"][i]["dataElement"] = new_dataelement
      //end of change data element

  }


  })
  .catch(error => {
    console.error(error)
  })
