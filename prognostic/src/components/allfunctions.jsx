import $ from "jquery";

const BASE = "http://localhost/project/";
//const BASE = "../";
class Person{

  constructor() {
 
  }
   
   getAllPerson() {
   var r = JSON.parse( $.ajax({
    type: 'POST',
    url: BASE + 'getAllPerson.php',
    dataType: 'json',
    async: false,
    done: function(response) {
        return response;
    }
	
}).responseText);
   
   return r;
  }
  
  
 deletePerson(Id){
   var r = $.ajax({
    type: 'POST',
    url: BASE +'deletePerson.php',
	data: {Id: Id},
    async: false,
    done: function(response) {
        return response;
    }
}).responseText;
   return r;
  }


 insertPerson(Name, Salary, SocialFactor, IncrementFactor){
   var r = $.ajax({
    type: 'POST',
    url: BASE + 'insertPerson.php',
	data: {Name: Name, Salary: Salary, SocialFactor: SocialFactor, IncrementFactor: IncrementFactor},
    async: false,
    done: function(response) {
        return response;
    }
}).responseText;
   return r;
  }
  
  
  
  updatePerson(Id, Name, Salary, SocialFactor, IncrementFactor){
	var r = $.ajax({ 
    type: 'POST',
    url: BASE + 'updatePerson.php',
    data: {Id: Id, Name: Name, Salary: Salary, SocialFactor: SocialFactor, IncrementFactor: IncrementFactor},
    async: false,
    done: function(response){
        return response ;    
    }
}).responseText;
return r;
}
}

// project class
class Project {

  constructor() {
 
  }
   
   getAllProject() {
   var r = JSON.parse( $.ajax({
    type: 'POST',
    url: BASE + 'getAllProject.php',
    dataType: 'json',
    async: false,
    done: function(response) {
        return response;
    }
	
}).responseText);
   
   return r;
  }
  
  
 deleteProject(Id){
   var r = $.ajax({
    type: 'POST',
    url: BASE + 'deleteProject.php',
	data: {Id: Id},
    async: false,
    done: function(response) {
        return response;
    }
}).responseText;
   return r;
  }


 insertProject(Name, EndDate, Stl, ExternalSalary, ExternalOverhead, ExternalOtherCost, InternalSalary, InternalOverhead, InternalOtherCost, SpendingExternalSalary, 
 SpendingExternalOverhead, SpendingExternalOtherCost, SpendingInternalSalary, SpendingInternalOverhead, SpendingInternalOtherCost, SpendingDate, OverheadConstant){
   var r = $.ajax({
    type: 'POST',
    url: BASE + 'insertProject.php',
	data: {Name: Name, EndDate: EndDate, Stl: Stl, ExternalSalary: ExternalSalary, ExternalOverhead: ExternalOverhead, ExternalOtherCost: ExternalOtherCost, 
	InternalSalary: InternalSalary, InternalOverhead: InternalOverhead, InternalOtherCost: InternalOtherCost, SpendingExternalSalary: SpendingExternalSalary, 
	SpendingExternalOverhead: SpendingExternalOverhead, SpendingExternalOtherCost: SpendingExternalOtherCost, 
	SpendingInternalSalary: SpendingInternalSalary, SpendingInternalOverhead: SpendingInternalOverhead, SpendingInternalOtherCost: SpendingInternalOtherCost, SpendingDate: SpendingDate, OverheadConstant: OverheadConstant},
    async: false,
    done: function(response) {
        return response;
    }
}).responseText;
   return r;
  }
  
  
  
  updateProject(Id, Name, EndDate, Stl, ExternalSalary, ExternalOverhead, ExternalOtherCost, InternalSalary, InternalOverhead, InternalOtherCost, SpendingExternalSalary, 
 SpendingExternalOverhead, SpendingExternalOtherCost, SpendingInternalSalary, SpendingInternalOverhead, SpendingInternalOtherCost, SpendingDate, OverheadConstant){
	var r = $.ajax({ 
    type: 'POST',
    url: BASE + 'updateProject.php',
    data: {Id: Id, Name: Name, EndDate: EndDate, Stl: Stl, ExternalSalary: ExternalSalary, ExternalOverhead: ExternalOverhead, ExternalOtherCost: ExternalOtherCost, 
	InternalSalary: InternalSalary, InternalOverhead: InternalOverhead, InternalOtherCost: InternalOtherCost, SpendingExternalSalary: SpendingExternalSalary, 
	SpendingExternalOverhead: SpendingExternalOverhead, SpendingExternalOtherCost: SpendingExternalOtherCost, 
	SpendingInternalSalary: SpendingInternalSalary, SpendingInternalOverhead: SpendingInternalOverhead, SpendingInternalOtherCost: SpendingInternalOtherCost, SpendingDate: SpendingDate, OverheadConstant: OverheadConstant},
    async: false,
    done: function(response){
        return response ;    
    }
}).responseText;
return r;
}
  
}

//allcotion

class Allocation {

  constructor() {
 
  }
   
   getAllAllocation() {
   var r = JSON.parse( $.ajax({
    type: 'POST',
    url: BASE + 'getAllAllocation.php',
    dataType: 'json',
    async: false,
    done: function(response) {
        return response;
    }
	
}).responseText);
   
   return r;
  }
  
  
 deleteAllocation(Id){
   var r = $.ajax({
    type: 'POST',
    url: BASE + 'deleteAllocation.php',
	data: {Id: Id},
    async: false,
    done: function(response) {
        return response;
    }
}).responseText;
   return r;
  }


 insertAllocation(personId, projectId, Percentage, StartDate, EndDate){
   var r = $.ajax({
    type: 'POST',
    url: BASE + 'insertAllocation.php',
	data: {personId: personId, projectId: projectId, Percentage: Percentage, StartDate: StartDate, EndDate: EndDate},
    async: false,
    done: function(response) {
        return response;
    }
}).responseText;
   return r;
  }
  
  
  
  updateAllocation(Id, Percentage, StartDate, EndDate){
	var r = $.ajax({ 
    type: 'POST',
    url: BASE +'updateAllocation.php',
    data: {Id: Id, Percentage: Percentage, StartDate: StartDate, EndDate: EndDate},
    async: false,
    done: function(response){
        return response ;    
    }
}).responseText;
return r;
}
 }
 
 // spending class
class Spending {

  constructor() {
 
  }
   
   getAllSpending() {
   var r = JSON.parse( $.ajax({
    type: 'POST',
    url: BASE + 'getAllSpending.php',
    dataType: 'json',
    async: false,
    done: function(response) {
        return response;
    }
	
}).responseText);
   
   return r;
  }
}
 
 
// Endbalance

class EndBalance {

  constructor() {
 
  }
   
   getAllEndBalance() {
   var r = JSON.parse( $.ajax({
    type: 'POST',
    url: BASE + 'getAllEndbalance.php',
    dataType: 'json',
    async: false,
    done: function(response) {
        return response;
    }
	
}).responseText);
   
   return r;
  }
 }

 
 
// Remaining class
class Remaining {

  constructor() {
 
  }
   
   getAllRemaining() {
   var r = JSON.parse( $.ajax({
    type: 'POST',
    url: BASE + 'getAllRemaining.php',
    dataType: 'json',
    async: false,
    done: function(response) {
        return response;
    }
	
}).responseText);
   
   return r;
  }
}

export {Person, Project, Allocation, Spending, EndBalance, Remaining};