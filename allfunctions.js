//person class


class Person{

  constructor() {
 
  }
   
   getAllPerson() {
   var r = JSON.parse( $.ajax({
    type: 'POST',
    url: 'getAllPerson.php',
    async: false,
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
    url: 'deletePerson.php',
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
    url: 'insertPerson.php',
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
    url: 'updatePerson.php',
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
    url: 'getAllProject.php',
    async: false,
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
    url: 'deleteProject.php',
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
    url: 'insertProject.php',
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
  
  
  
  updateProject(Id, EndDate, Stl, ExternalSalary, ExternalOverhead, ExternalOtherCost, InternalSalary, InternalOverhead, InternalOtherCost, SpendingExternalSalary, 
 SpendingExternalOverhead, SpendingExternalOtherCost, SpendingInternalSalary, SpendingInternalOverhead, SpendingInternalOtherCost, SpendingDate, OverheadConstant){
	var r = $.ajax({ 
    type: 'POST',
    url: 'updateProject.php',
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
    url: 'getAllAllocation.php',
    async: false,
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
    url: 'deleteAllocation.php',
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
    url: 'insertAllocation.php',
	data: {personId: personId, projectId: projectId, Percentage: Percentage, StartDate: StartDate, EndDate: Enddate},
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
    url: 'updateAllocation.php',
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
    url: 'getAllSpending.php',
    async: false,
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
    url: 'getAllEndbalance.php',
    async: false,
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
    url: 'getAllRemaining.php',
    async: false,
    dataType: 'json',
    async: false,
    done: function(response) {
        return response;
    }
	
}).responseText);
   
   return r;
  }
}