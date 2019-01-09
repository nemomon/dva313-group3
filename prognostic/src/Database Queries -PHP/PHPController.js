
// these two links should be added to your html page
// <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>  
// <script src="allfunctions.js"></script> 

class PHPController {

      constructor() { 
        this.init();
      }

      init(){
        let personClass = new Person();
        this.personClass= personClass;
        this.personTable= personClass.getAllPerson();

      let projectClass = new Project(); // create an object from project class
      this.projectClass= projectClass;  // save the class object locally
      this.projectTable= projectClass.getAllProject(); //create a local array for all projects

      let allocationClass = new Allocation();
      this.allocationClass= allocationClass;
      this.allocationTable= allocationClass.getAllAllocation();

      let endbalanceClass = new EndBalance();
      this.endbalanceClass= endbalanceClass;
      this.endbalanceTable= endbalanceClass.getAllEndBalance();

      //let spendingClass = new Spending();
      //this.spendingClass= spendingClass;
      //this.spendingTable= spendingClass.getAllSpending();

      let remainingClass = new Remaining();
      this.remainingClass= remainingClass;
      this.remainingTable= remainingClass.getAllRemaining();

      this.deletedPersons=[];
      this.deletedProjects=[];
      this.deletedAllocations=[];
    }



     //Person
     insertPerson(newPerson){
      
       if (newPerson['Id'].charAt(0) == 'T' && newPerson['Flag'] =='I' ){
         this.personTable.push(newPerson);
       }
     }


     updatePerson(person){

       for (var i = 0; i < this.personTable.length; i++) {
         if(this.personTable[i]['Id']==person['Id'] && person['Flag'] =='U'){

          this.personTable[i]['Name']=person['Name'];
          this.personTable[i]['Salary']=person['Salary'];
          this.personTable[i]['SocialFactor']=person['SocialFactor'];
          this.personTable[i]['IncrementFactor']=person['IncrementFactor'];
        }
      }
      for (var i = 0; i < this.allocationTable.length; i++) {
        if(this.allocationTable[i]['personId']==person['Id']){
         this.allocationTable[i]['personName']= person['Name'];
       }
     }

   }

   deletePerson(person){
    for (var i = 0; i < this.personTable.length; i++) {
             if(this.personTable[i]['Id']==person['Id'] && person['Flag'] =='D' && person['Id'].charAt(0) == 'T'){ //delete a person not exists in database
              this.personTable.splice(i, 1);
              for (var i = 0; i < this.allocationTable.length; i++) {
                if(this.allocationTable[i]['personId']==person['Id']){
                  this.allocationTable.splice(i, 1);
                }
              }
            }
                else if (this.personTable[i]['Id']==person['Id'] && person['Flag'] =='D'){ //delete a person exists in the database
                 this.deletedPersons.push(person['Id']);
                 this.personTable.splice(i, 1);
                 for (var i = 0; i < this.allocationTable.length; i++) {
                  if(this.allocationTable[i]['personId']==person['Id']){
                   this.deletedAllocations.push(this.allocationTable[i]['Id']);
                   this.allocationTable.splice(i, 1);
                 }
               }
             }   
           }
         }

      // Project
      insertProject(newProject){
      
       if (newProject['Id'].charAt(0) == 'T' && newProject['Flag'] =='I' ){
         this.projectTable.push(newProject);
       }
     }
     
     updateProject(project){

      for (var i = 0; i < this.projectTable.length; i++) {
       if(this.projectTable[i]['Id']==project['Id'] && project['Flag'] =='U'){

        this.projectTable[i]['Name']=project['Name'];
        this.projectTable[i]['EndDate']=project['EndDate'];
        this.projectTable[i]['Stl']=project['Stl'];
        this.projectTable[i]['ExternalOverhead']=project['ExternalOverhead'];
        this.projectTable[i]['ExternalOtherCost']=project['ExternalOtherCost'];
        this.projectTable[i]['InternalSalary']=project['InternalSalary'];
        this.projectTable[i]['InternalOverhead']=project['InternalOverhead'];
        this.projectTable[i]['InternalOtherCost']=project['InternalOtherCost'];
        this.projectTable[i]['SpendingExternalSalary']=project['SpendingExternalSalary'];
        this.projectTable[i]['SpendingExternalOverhead']=project['SpendingExternalOverhead'];
        this.projectTable[i]['SpendingExternalOtherCost']=project['SpendingExternalOtherCost'];
        this.projectTable[i]['SpendingInternalSalary']=project['SpendingInternalSalary'];
        this.projectTable[i]['SpendingInternalOverhead']=project['SpendingInternalOverhead'];
        this.projectTable[i]['SpendingInternalOtherCost']=project['SpendingInternalOtherCost'];
        this.projectTable[i]['SpendingDate']=project['SpendingDate'];
        this.projectTable[i]['OverheadConstant']=project['OverheadConstant'];
        this.projectTable[i]['ExternalSalary']=project['ExternalSalary'];
      }
    }
    for (var i = 0; i < this.allocationTable.length; i++) {
      if(this.allocationTable[i]['projectId']==project['Id']){
        this.allocationTable[i]['projectName']= project['Name'];
      }
    }

  }

  deleteProject(project){
    for (var i = 0; i < this.projectTable.length; i++) {
             if(this.projectTable[i]['Id']==project['Id'] && project['Flag'] =='D' && project['Id'].charAt(0) == 'T'){ //delete a person not exists in database
              this.projectTable.splice(i, 1);
              for (var i = 0; i < this.allocationTable.length; i++) {
                if(this.allocationTable[i]['projectId']==project['Id']){
                  this.allocationTable.splice(i, 1);
                }
              }
            }
                else if (this.projectTable[i]['Id']==project['Id'] && project['Flag'] =='D'){ //delete a person exists in the database
                 this.deletedProjects.push(project['Id']);
                 this.projectTable.splice(i, 1);
                 for (var i = 0; i < this.allocationTable.length; i++) {
                  if(this.allocationTable[i]['projectId']==project['Id']){
                    this.deletedAllocations.push(this.allocationTable[i]['Id']);
                    this.allocationTable.splice(i, 1);
                  }
                }
              }   
            }
          }

     // Allocation
     insertAllocation(newAllocation){
      if (newAllocation['Id'].charAt(0) == 'T' && newAllocation['Flag'] =='I' ){
         this.allocationTable.push(newAllocation);
       }

     }

     updateAllocation(allocation){

       for (var i = 0; i < this.allocationTable.length; i++) {
         if(this.allocationTable[i]['Id']==allocation['Id'] && allocation['Flag'] =='U'){
          this.allocationTable[i]['Percentage']=allocation['Percentage'];
          this.allocationTable[i]['StartDate']=allocation['StartDate'];
          this.allocationTable[i]['EndDate']=allocation['EndDate'];

        }
      }

    }

    deleteAllocation(allocation){
      for (var i = 0; i < this.allocationTable.length; i++) {
             if(this.allocationTable[i]['Id']==allocation['Id'] && allocation['Flag'] =='D' && allocation['Id'].charAt(0) == 'T'){ //delete a person not exists in database
              this.allocationTable.splice(i, 1);
            }
                else if (this.allocationTable[i]['Id']==allocation['Id'] && allocation['Flag'] =='D'){ //delete a person exists in the database
                 this.deletedAllocations.push(allocation['Id']);
                 this.allocationTable.splice(i, 1);
               }   
             }
           }

           getAllocation(personId){
            var allocations=[];
            for (var i = 0; i < this.allocationTable.length; i++) {
              if(this.allocationTable[i]['personId']==personId){
               allocations.push(this.allocationTable[i]);
             }
           }
           return allocations;        

         }



         saveAll(){
          //Deletion first (Allocation, person , project)
          for (var i = 0; i < this.deletedAllocations.length; i++) {
            this.allocationClass.deleteAllocation(this.deletedAllocations[i]);

          }
          for (var i = 0; i < this.deletedPersons.length; i++) {
            this.personClass.deletePerson(this.deletedPersons[i]);
          }
          for (var i = 0; i < this.deletedProjects.length; i++) {
            this.projectClass.deleteProject(this.deletedProjects[i]);
          }


          //Insert and Update (Person)
          for (var i = 0; i < this.personTable.length; i++) {
           if(this.personTable[i]['Flag']=='I'){
            var insertedId= this.personClass.insertPerson(this.personTable[i]['Name'], this.personTable[i]['Salary'], this.personTable[i]['SocialFactor'], this.personTable[i]['IncrementFactor']);
            //update allocation temprory Ids
            for (var j = 0; j < this.allocationTable.length; j++) {
              if(this.allocationTable[j]['personId']==this.personTable[i]['Id']){
                this.allocationTable[j]['personId'] = insertedId;

              }
            }

          }
          else if(this.personTable[i]['Flag']=='U' && this.personTable[i]['Id'].charAt(0) == 'T'){
           this.personClass.insertPerson(this.personTable[i]['Name'], this.personTable[i]['Salary'], this.personTable[i]['SocialFactor'], this.personTable[i]['IncrementFactor']);
         }
         else if(this.personTable[i]['Flag']=='U'){
           this.personClass.updatePerson(this.personTable[i]['Id'],this.personTable[i]['Name'], this.personTable[i]['Salary'], this.personTable[i]['SocialFactor'], this.personTable[i]['IncrementFactor']);
         }


       }

        //Insert and Update(Project)
        for (var i = 0; i < this.projectTable.length; i++) {
          if(this.projectTable[i]['Flag']=='I'){

            var insertedId= this.projectClass.insertProject(this.projectTable[i]['Name'],
              this.projectTable[i]['EndDate'],
              this.projectTable[i]['Stl'],
              this.projectTable[i]['ExternalSalary'],
              this.projectTable[i]['ExternalOverhead'],
              this.projectTable[i]['ExternalOtherCost'],
              this.projectTable[i]['InternalSalary'],
              this.projectTable[i]['InternalOverhead'],
              this.projectTable[i]['InternalOtherCost'],
              this.projectTable[i]['SpendingExternalSalary'],
              this.projectTable[i]['SpendingExternalOverhead'],
              this.projectTable[i]['SpendingExternalOtherCost'],
              this.projectTable[i]['SpendingInternalSalary'],
              this.projectTable[i]['SpendingInternalOverhead'],
              this.projectTable[i]['SpendingInternalOtherCost'],
              this.projectTable[i]['SpendingDate'],
              this.projectTable[i]['OverheadConstant']
              );
             alert(insertedId);
            //update allocation temprory Ids
            for (var j = 0; j < this.allocationTable.length; j++) {
              if(this.allocationTable[j]['projectId']==this.projectTable[i]['Id']){
                this.allocationTable[j]['projectId'] = insertedId;

              }
            }

          }
          else if(this.projectTable[i]['Flag']=='U' && this.projectTable[i]['Id'].charAt(0) == 'T'){
           this.projectClass.insertProject(this.projectTable[i]['Name'],
            this.projectTable[i]['EndDate'],
            this.projectTable[i]['Stl'],
            this.projectTable[i]['ExternalSalary'],
            this.projectTable[i]['ExternalOverhead'],
            this.projectTable[i]['ExternalOtherCost'],
            this.projectTable[i]['InternalSalary'],
            this.projectTable[i]['InternalOverhead'],
            this.projectTable[i]['InternalOtherCost'],
            this.projectTable[i]['SpendingExternalSalary'],
            this.projectTable[i]['SpendingExternalOverhead'],
            this.projectTable[i]['SpendingExternalOtherCost'],
            this.projectTable[i]['SpendingInternalSalary'],
            this.projectTable[i]['SpendingInternalOverhead'],
            this.projectTable[i]['SpendingInternalOtherCost'],
            this.projectTable[i]['SpendingDate'],
            this.projectTable[i]['OverheadConstant']);
         }
         else if(this.projectTable[i]['Flag']=='U'){
           this.projectClass.updateProject(this.projectTable[i]['Id'],
            this.projectTable[i]['Name'],
            this.projectTable[i]['EndDate'],
            this.projectTable[i]['Stl'],
            this.projectTable[i]['ExternalSalary'],
            this.projectTable[i]['ExternalOverhead'],
            this.projectTable[i]['ExternalOtherCost'],
            this.projectTable[i]['InternalSalary'],
            this.projectTable[i]['InternalOverhead'],
            this.projectTable[i]['InternalOtherCost'],
            this.projectTable[i]['SpendingExternalSalary'],
            this.projectTable[i]['SpendingExternalOverhead'],
            this.projectTable[i]['SpendingExternalOtherCost'],
            this.projectTable[i]['SpendingInternalSalary'],
            this.projectTable[i]['SpendingInternalOverhead'],
            this.projectTable[i]['SpendingInternalOtherCost'],
            this.projectTable[i]['SpendingDate'],
            this.projectTable[i]['OverheadConstant']);
         }


       }

          //Insert and Update (Allocation)
          for (var i = 0; i < this.allocationTable.length; i++) {
           if(this.allocationTable[i]['Flag']=='I'){

            this.allocationClass.insertAllocation(this.allocationTable[i]['personId'], this.allocationTable[i]['projectId'], this.allocationTable[i]['Percentage'], 
             this.allocationTable[i]['StartDate'], this.allocationTable[i]['EndDate']);

          }
          else if(this.allocationTable[i]['Flag']=='U' && this.allocationTable[i]['Id'].charAt(0) == 'T'){

            this.allocationClass.insertAllocation(this.allocationTable[i]['personId'], this.allocationTable[i]['projectId'], this.allocationTable[i]['Percentage'], 
              this.allocationTable[i]['StartDate'], this.allocationTable[i]['EndDate']);
          }
          else if(this.allocationTable[i]['Flag']=='U'){

            this.allocationClass.updateAllocation(this.allocationTable[i]['Id'],this.allocationTable[i]['Percentage'], this.allocationTable[i]['StartDate'], 
             this.allocationTable[i]['EndDate']);          

          }


        }

        p.init();
      }
    }



  // test the work here
  //let p = new PHPController();
  //alert(p.allocationTable[0]['Id']);
  //alert(p.getAllPersons()[0]['Id']); 
  //p.insertPerson({'Id':'T1','Name':'Mohammed', 'Salary' : '123456','SocialFactor' : '4.4','IncrementFactor' : '5.5','Flag' : 'I'});

  //p.updatePerson({'Id':'T1','Name':'Usamah', 'Salary' : '123','SocialFactor':'4.4','IncrementFactor':'5.5', 'Flag':'U'});

  //alert(p.personTable.length);
  //p.deletePerson({'Id':'T13','Name':'Usamah', 'Salary' : '123','SocialFactor':'4.4','IncrementFactor':'5.5', 'Flag':'D'});

  //alert(p.personTable.length);
  //alert(p.deletedAllocations);
  //p.savePerson();
  /*p.insertProject({'Id':'T1','Name':'Usamah', 'EndDate' : '01-01-2018','Stl':'1','ExternalSalary':'5','ExternalOverhead':'5','ExternalOtherCost':'5','InternalSalary':'5','InternalOverhead':'5','InternalOtherCost':'5','SpendingExternalSalary':'5','SpendingExternalOverhead':'5','SpendingExternalOtherCost':'5','SpendingInternalSalary':'5','SpendingInternalOverhead':'5','SpendingInternalOtherCost':'5','SpendingDate':'01-01-2018','OverheadConstant':'5', 'Flag':'I'});
   p.updateProject({'Id':'T1','Name':'Mohammed', 'EndDate' : '01-01-2018','Stl':'1','ExternalSalary':'5','ExternalOverhead':'5','ExternalOtherCost':'5','InternalSalary':'5','InternalOverhead':'5','InternalOtherCost':'5','SpendingExternalSalary':'5','SpendingExternalOverhead':'5','SpendingExternalOtherCost':'5','SpendingInternalSalary':'5','SpendingInternalOverhead':'5','SpendingInternalOtherCost':'5','SpendingDate':'01-01-2018','OverheadConstant':'5', 'Flag':'U'});
   p.deleteProject({'Id':'13', 'Flag':'D'});*/
  
  //p.insertAllocation({'Id':'T1','personId':'T1','projectId':'6','Percentage':'50.0','StartDate':'2016-01-01','EndDate':'2016-01-01','Flag':'I'});
  //p.updateAllocation({'Id':'8','Percentage':'100.0','StartDate':'2018-07-01','EndDate':'2020-01-01','Flag':'U'});

  //p.saveAll();