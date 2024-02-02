# dvdmt-facility-comparison
Comparing facilities in DVDMT and DHIS2

Download the program files ( zipped folder to be sent through email
 
You need to install node JS on your computer in order to run this (https://www.geeksforgeeks.org/installation-of-node-js-on-linux/  for Linux and (https://phoenixnap.com/kb/install-node-js-npm-on-windows)

You need two files 1. Is the master_facilities.xlxs which has mappings of the facilities between DVDMT and DHIS2. This file should have the headers 
zone
district
dvdmt_name
dhis2_name

You need to extract the columns (Province_name up to month) from the DVDMT and rename remove other unnecessary columns and rename them to 
zone
district
dvdmt_name
month

Once you have done that you should save your file as dvdmt_file.xlxs 

All the above file will be in same location as the file named compare_facilities.js

Run the above file by going to the terminal and going into the folder for the program files  by executing the command node compare_facilities.js

You should have the output file named (DVDMT_Mapped_facilities_data) in output folder 

Open this file and you should be able to check which facilities have been mapped and which ones have note been mapped.
