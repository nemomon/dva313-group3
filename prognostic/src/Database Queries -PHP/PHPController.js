
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
       this.refreshEndBalance();
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
     this.refreshEndBalance();

   }

   deletePerson(person){
    for (var i = 0; i < this.personTable.length; i++) {
             if(this.personTable[i]['Id']==person['Id'] && person['Flag'] =='D' && person['Id'].charAt(0) == 'T'){ //delete a person not exists in database
              this.personTable.splice(i, 1);
              i--;
              for (var j = 0; j < this.allocationTable.length; i++) {
                if(this.allocationTable[j]['personId']==person['Id']){
                  this.allocationTable.splice(j, 1);
                  j--;
                }
              }
            }
                else if (this.personTable[i]['Id']==person['Id'] && person['Flag'] =='D'){ //delete a person exists in the database
                 this.deletedPersons.push(person['Id']);
                 this.personTable.splice(i, 1);
                 i--;
                 for (var j = 0; j < this.allocationTable.length; j++) {
                  if(this.allocationTable[j]['personId']==person['Id']){
                   this.deletedAllocations.push(this.allocationTable[j]['Id']);
                   this.allocationTable.splice(j, 1);
                   j--;
                 }
               }
             }   
           }
           this.refreshEndBalance();
         }

      // Project
      insertProject(newProject){

       if (newProject['Id'].charAt(0) == 'T' && newProject['Flag'] =='I' ){
         this.projectTable.push(newProject);
       }
       //refresh remaining
       this.refreshRemaining();
       this.refreshEndBalance();
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
     //refresh remaining
     this.refreshRemaining();
     this.refreshEndBalance();

   }

   deleteProject(project){
    for (var i = 0; i < this.projectTable.length; i++) {
             if(this.projectTable[i]['Id']==project['Id'] && project['Flag'] =='D' && project['Id'].charAt(0) == 'T'){ //delete a person not exists in database
              this.projectTable.splice(i, 1);
              i--;
              for (var j = 0; j < this.allocationTable.length; j++) {
                if(this.allocationTable[j]['projectId']==project['Id']){
                  this.allocationTable.splice(j, 1);
                  j--;
                }
              }
            }
                else if (this.projectTable[i]['Id']==project['Id'] && project['Flag'] =='D'){ //delete a person exists in the database
                 this.deletedProjects.push(project['Id']);
                 this.projectTable.splice(i, 1);
                 i--;
                 for (var j = 0; j < this.allocationTable.length; j++) {
                  if(this.allocationTable[j]['projectId']==project['Id']){
                    this.deletedAllocations.push(this.allocationTable[j]['Id']);
                    this.allocationTable.splice(j, 1);
                    j--;
                  }
                }
              }   
            }
             //refresh remaining
             this.refreshRemaining();
             this.refreshEndBalance();
           }

     // Allocation
     insertAllocation(newAllocation){
      if (newAllocation['Id'].charAt(0) == 'T' && newAllocation['Flag'] =='I' ){
       this.allocationTable.push(newAllocation);
     }
     this.refreshEndBalance();

   }

   updateAllocation(allocation){

     for (var i = 0; i < this.allocationTable.length; i++) {
       if(this.allocationTable[i]['Id']==allocation['Id'] && allocation['Flag'] =='U'){
        this.allocationTable[i]['Percentage']=allocation['Percentage'];
        this.allocationTable[i]['StartDate']=allocation['StartDate'];
        this.allocationTable[i]['EndDate']=allocation['EndDate'];

      }
    }
    this.refreshEndBalance();

  }

  deleteAllocation(allocation){
    for (var i = 0; i < this.allocationTable.length; i++) {
             if(this.allocationTable[i]['Id']==allocation['Id'] && allocation['Flag'] =='D' && allocation['Id'].charAt(0) == 'T'){ //delete a person not exists in database
              this.allocationTable.splice(i, 1);
              i--;
            }
                else if (this.allocationTable[i]['Id']==allocation['Id'] && allocation['Flag'] =='D'){ //delete a person exists in the database
                 this.deletedAllocations.push(allocation['Id']);
                 this.allocationTable.splice(i, 1);
                 i--;
               }   
             }
             this.refreshEndBalance();
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

         refreshRemaining(){
          this.remainingTable=[];
          for (var i = 0; i < this.projectTable.length; i++) {

            if(this.projectTable[i]['Flag'] != 'D'){
              this.remainingTable.push({'Id':this.projectTable[i]['Id'],'Name':this.projectTable[i]['Name'], 'SpendingDate':this.projectTable[i]['SpendingDate'],
                'ExternalSalary':this.projectTable[i]['ExternalSalary'] - this.projectTable[i]['SpendingExternalSalary'], 'ExternalOverhead':this.projectTable[i]['ExternalOverhead'] - this.projectTable[i]['SpendingExternalOverhead'], 'ExternalOtherCost':this.projectTable[i]['ExternalOtherCost'] - this.projectTable[i]['SpendingExternalOtherCost'], 'InternalSalary':this.projectTable[i]['InternalSalary'] - this.projectTable[i]['SpendingInternalSalary'] , 'InternalOverhead':this.projectTable[i]['InternalOverhead'] - this.projectTable[i]['SpendingInternalOverhead'],'InternalOtherCost':this.projectTable[i]['InternalOtherCost'] - this.projectTable[i]['SpendingInternalOtherCost']});
            }
          }

        }

        refreshEndBalance(){

          this.endbalanceTable=[];
          var joinSalaryCost = [];
          //apply join
          for (var i = 0; i < this.allocationTable.length; i++) {
            var row={'all_projectId': '','pr_SpendingDate':'' , 'all_StartDate':'', 'all_EndDate':'' , 'all_Percentage':'', 'p_SocialFactor':'', 'p_Salary':''};
            row['all_projectId']= this.allocationTable[i]['projectId'];
            row['all_StartDate']= this.allocationTable[i]['StartDate'];
            row['all_EndDate']= this.allocationTable[i]['EndDate'];
            row['all_Percentage']= this.allocationTable[i]['Percentage'];
            for (var j = 0; j < this.projectTable.length; j++) {
              if(this.allocationTable[i]['projectId']==this.projectTable[j]['Id']){
               row['pr_SpendingDate'] = this.projectTable[j]['SpendingDate'];
               
             }
           }
           for (var j = 0; j < this.personTable.length; j++) {
            if(this.allocationTable[i]['personId']==this.personTable[j]['Id']){
            row['p_SocialFactor'] = this.personTable[j]['SocialFactor'];
            row['p_Salary'] = this.personTable[j]['Salary'];
           
          }
          }
          joinSalaryCost.push(row);
        }
           // apply calculations
           var SalaryCost = [];
           for (var i = 0; i < this.projectTable.length; i++) {
            var row = {'projectId':'','Salary':''};
            var sum=0;
             for (var j = 0; j < joinSalaryCost.length; j++) {
                if(joinSalaryCost[j]['all_projectId']==this.projectTable[i]['Id']){
                  var date;
                  if(joinSalaryCost[j]['pr_SpendingDate']==''){
                     date= joinSalaryCost[j]['all_StartDate'];
                  }
                  else if(joinSalaryCost[j]['all_StartDate']>joinSalaryCost[j]['pr_SpendingDate']){
                    date= joinSalaryCost[j]['all_StartDate'];

                  }
                  else{
                    date= joinSalaryCost[j]['pr_SpendingDate'];

                  }
              
                  sum= sum + (this.monthDiff(date,joinSalaryCost[j]['all_EndDate']) * '0.01' * parseFloat(joinSalaryCost[j]['all_Percentage']) * (1+parseFloat(joinSalaryCost[j]['p_SocialFactor'])) * parseFloat(joinSalaryCost[j]['p_Salary']));
                  row['projectId']=this.projectTable[i]['Id'];
                  row['Salary']=sum;

                }
             }
             if(row['projectId']!=''){
             
             SalaryCost.push(row);

           }
           }
              // apply join
              var joinEndBalance = [];
               for (var i = 0; i < SalaryCost.length; i++) {
            var row={'pr_Id': '','pr_Name':'' , 'pr_ExternalSalary':'', 'pr_InternalSalary':'' , 'r_ExternalSalary':'', 'sc_Salary':'', 'r_InternalSalary':'', 'pr_ExternalOverhead':'', 'pr_InternalOverhead':'' , 'r_ExternalOverhead':'', 'r_InternalOverhead':'','pr_OverheadConstant':'','r_ExternalOtherCost,':'','r_InternalOtherCost':''};
            row['sc_Salary']= SalaryCost[i]['Salary'];
      
            for (var j = 0; j < this.projectTable.length; j++) {
              if(SalaryCost[i]['projectId']==this.projectTable[j]['Id']){
               row['pr_Id'] = this.projectTable[j]['Id'];
               row['pr_Name'] = this.projectTable[j]['Name'];
               row['pr_ExternalSalary'] = this.projectTable[j]['ExternalSalary'];
               row['pr_InternalSalary'] = this.projectTable[j]['InternalSalary'];
               row['pr_ExternalOverhead'] = this.projectTable[j]['ExternalOverhead'];
               row['pr_InternalOverhead'] = this.projectTable[j]['InternalOverhead'];
               row['pr_OverheadConstant'] = this.projectTable[j]['OverheadConstant'];
             
             }
           }
           for (var j = 0; j < this.remainingTable.length; j++) {
            if(SalaryCost[i]['projectId']==this.remainingTable[j]['Id']){
            row['r_ExternalSalary'] = this.remainingTable[j]['ExternalSalary'];
            row['r_InternalSalary'] = this.remainingTable[j]['InternalSalary'];
            row['r_ExternalOverhead'] = this.remainingTable[j]['ExternalOverhead'];
            row['r_InternalOverhead'] = this.remainingTable[j]['InternalOverhead'];
            row['r_ExternalOtherCost'] = this.remainingTable[j]['ExternalOtherCost'];
            row['r_InternalOtherCost'] = this.remainingTable[j]['InternalOtherCost'];

          }
          }
          joinEndBalance.push(row);

        }

        // apply calculations
        for (var i = 0; i < joinEndBalance.length; i++) {
          var row= {'Id':'','Name':'','ExternalSalary':'','InternalSalary':'','ExternalOverhead':'','InternalOverhead':'','ExternalOtherCost':'','InternalOtherCost':''};
          row['Id']=joinEndBalance[i]['pr_Id'];
          row['Name']=joinEndBalance[i]['pr_Name'];
          if(joinEndBalance[i]['pr_ExternalSalary']+joinEndBalance[i]['pr_InternalSalary'] != 0){
            row['ExternalSalary'] = Math.round((parseFloat(joinEndBalance[i]['r_ExternalSalary'])-parseFloat(joinEndBalance[i]['pr_ExternalSalary'])/(parseFloat(joinEndBalance[i]['pr_ExternalSalary'])+parseFloat(joinEndBalance[i]['pr_InternalSalary']))*parseFloat(joinEndBalance[i]['sc_Salary'])) * 100) / 100;
              
            
          }
          else{
            row['ExternalSalary'] =parseFloat(joinEndBalance[i]['r_ExternalSalary'])-parseFloat(joinEndBalance[i]['sc_Salary']);
          }
           if(joinEndBalance[i]['pr_ExternalSalary']+joinEndBalance[i]['pr_InternalSalary'] != 0){
            row['InternalSalary'] = Math.round((parseFloat(joinEndBalance[i]['r_InternalSalary'])-parseFloat(joinEndBalance[i]['pr_InternalSalary'])/(parseFloat(joinEndBalance[i]['pr_ExternalSalary'])+parseFloat(joinEndBalance[i]['pr_InternalSalary']))*parseFloat(joinEndBalance[i]['sc_Salary'] ))* 100 )/ 100;


          }
          else{
            row['InternalSalary'] =parseFloat(joinEndBalance[i]['r_InternalSalary'])-parseFloat(joinEndBalance[i]['sc_Salary']);
          }
           if(joinEndBalance[i]['pr_ExternalOverhead']+joinEndBalance[i]['pr_InternalOverhead'] != 0){
            row['ExternalOverhead'] = Math.round((parseFloat(joinEndBalance[i]['r_ExternalOverhead'])-parseFloat(joinEndBalance[i]['pr_ExternalOverhead'])/(parseFloat(joinEndBalance[i]['pr_ExternalOverhead'])+parseFloat(joinEndBalance[i]['pr_ExternalOverhead']))*parseFloat(joinEndBalance[i]['sc_Salary'])) * 100) / 100;
        
          }
          else{
             row['ExternalOverhead'] =parseFloat(joinEndBalance[i]['r_ExternalOverhead'])-parseFloat(joinEndBalance[i]['pr_OverheadConstant'])*parseFloat(joinEndBalance[i]['sc_Salary']);
          }
           if(joinEndBalance[i]['pr_ExternalOverhead']+joinEndBalance[i]['pr_InternalOverhead'] != 0){
            row['InternalOverhead'] = Math.round((parseFloat(joinEndBalance[i]['r_InternalOverhead'])-parseFloat(joinEndBalance[i]['pr_InternalOverhead'])/(parseFloat(joinEndBalance[i]['pr_ExternalOverhead'])+parseFloat(joinEndBalance[i]['pr_InternalOverhead']))*parseFloat(joinEndBalance[i]['sc_Salary'] ))* 100) / 100;
                    }
          else{
            row['InternalOverhead'] =parseFloat(joinEndBalance[i]['r_InternalOverhead'])-parseFloat(joinEndBalance[i]['pr_OverheadConstant'])*parseFloat(joinEndBalance[i]['sc_Salary']);
          }
          row['ExternalOtherCost']=joinEndBalance[i]['r_ExternalOtherCost'];
          row['InternalOtherCost']=joinEndBalance[i]['r_InternalOtherCost'];
          this.endbalanceTable.push(row);

        }

        
      }
      monthDiff(d1, d2) {

return new Date(d2).getMonth() - new Date(d1).getMonth() + (12 * (new Date(d2).getFullYear() - new Date(d1).getFullYear()));
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

        this.init();
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
 /* p.insertProject({'Id':'T1','Name':'Usamah', 'EndDate' : '01-01-2018','Stl':'1','ExternalSalary':'5','ExternalOverhead':'5','ExternalOtherCost':'5','InternalSalary':'5','InternalOverhead':'5','InternalOtherCost':'5','SpendingExternalSalary':'5','SpendingExternalOverhead':'5','SpendingExternalOtherCost':'5','SpendingInternalSalary':'5','SpendingInternalOverhead':'5','SpendingInternalOtherCost':'5','SpendingDate':'01-01-2018','OverheadConstant':'5', 'Flag':'I'});
 p.updateProject({'Id':'T1','Name':'Mohammed', 'EndDate' : '01-01-2018','Stl':'1','ExternalSalary':'5','ExternalOverhead':'5','ExternalOtherCost':'5','InternalSalary':'5','InternalOverhead':'5','InternalOtherCost':'5','SpendingExternalSalary':'5','SpendingExternalOverhead':'5','SpendingExternalOtherCost':'5','SpendingInternalSalary':'5','SpendingInternalOverhead':'5','SpendingInternalOtherCost':'5','SpendingDate':'01-01-2018','OverheadConstant':'5', 'Flag':'U'});*/
   //p.deleteProject({'Id':'11', 'Flag':'D'});

  //p.insertAllocation({'Id':'T1','personId':'10','projectId':'11','Percentage':'50.0','StartDate':'2016-01-01','EndDate':'2016-01-01','Flag':'I'});
  //p.updateAllocation({'Id':'8','Percentage':'100.0','StartDate':'2018-07-01','EndDate':'2020-01-01','Flag':'U'});

  //p.refreshEndBalance();
  //p.saveAll();
