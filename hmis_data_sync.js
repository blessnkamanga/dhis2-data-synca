const _ = require('lodash')
const json2xls = require('json2xls')
const fs = require('fs')
const axios = require('axios')
var XLSX = require('xlsx')

function  postMohData(dataSet,orgUnit,startDate,endDate){

//source URLs
var source_baseurl ="http://41.87.6.40:8080/hmistest"
var source_username = "yambansokausiwa"
var source_password = "Bscinf-07"

//target URL
var target_baseurl ="http://41.87.6.59:8080/2.40"
var target_username = "administrator"
var target_password = "Testing@2024"





  

     //period="2021-10-18"

     //get organisation units


var completedataset = source_baseurl+"/api/completeDataSetRegistrations.json?dataSet="+dataSet+"&startDate="+startDate+"&endDate="+endDate+"&orgUnit="+orgUnit+"&children=true"
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
    //checking if a completed form is available for the organisation unit
    if(generated_payload.completeDataSetRegistrations === undefined){
      console.log(`Completed dataset not found for OU : ${orgUnit} `)
    }else{
    for (var i = 0; i < generated_payload.completeDataSetRegistrations.length; i++) {

      try{
     //get the organisation unit and the period
     var dataSet = generated_payload["completeDataSetRegistrations"][i]["dataSet"]
     var orgunit = generated_payload["completeDataSetRegistrations"][i]["organisationUnit"]
     var period = generated_payload["completeDataSetRegistrations"][i]["period"]
     //get the dataValues
       var datavaluesurl = source_baseurl+"/api/dataValueSets?dataSet="+dataSet+"&orgUnit="+orgunit+"&period="+period
     //send the data to destination instance.
       axios
       .get(datavaluesurl,{
     auth: {
         username: source_username,
         password: source_password
       }
     })
       .then(res1 => {
         //console.log(res1)
         var data_payload= res1.data
         var completeDate = data_payload["dataValues"][0]["created"].split("T")[0]
         //console.log(completeDate)
         data_payload["completeDate"]= completeDate
        // console.log(data_payload)

         //change the attributeoptioncombo
         for (var i = 0; i < data_payload.dataValues.length; i++) {
          //get the variables

           //generated_payload["dataValues"][i]["attributeOptionCombo"] = "HllvX50cXC0" //from HMIS to OHSP

           data_payload["dataValues"][i]["attributeOptionCombo"] = "Tt7fU5lUhAU" //from OHSP to HMIS
          //end of change data element  HllvX50cXC0

          }

         //end of change the attribute option combo
          var target_datavaluesurl = target_baseurl+"/api/dataValueSets"
          
         axios
           .post(target_datavaluesurl,data_payload,{
         auth: {
             username: target_username,
             password: target_password
           }
         })
           .then(res => {

         //echo the results
         console.log('posted')


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
      catch (err){

      }
      

    }
    }


  })
  .catch(error => {
    console.error(error)
  })

  
  
}
module.exports = postMohData

