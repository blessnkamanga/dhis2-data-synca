delete from categoryoptioncombo where categoryoptioncomboid='20423394';
delete from completedatasetregistration where attributeoptioncomboid='20423394';
delete from datadimensionitem where dataelementoperand_categoryoptioncomboid='20423394';
delete from visualization_datadimensionitems;
delete from datavalue where attributeoptioncomboid='20423394';
delete from datavalueaudit where attributeoptioncomboid='20423394';

//start from bottom up