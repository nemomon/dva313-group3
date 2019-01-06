
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

    let spendingClass = new Spending();
    this.spendingClass= spendingClass;
    this.spendingTable= spendingClass.getAllSpending();

    let remainingClass = new Remaining();
    this.remainingClass= remainingClass;
    this.remainingTable= remainingClass.getAllRemaining();

    this.deletedPersons=[];
    this.deletedAllocations=[];
   }
   
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

     
     savePerson(){
      for (var i = 0; i < this.personTable.length; i++) {
        if(this.personTable[i]['Flag']=='I'){
          this.personClass.insertPerson(this.personTable[i]['Name'], this.personTable[i]['Salary'], this.personTable[i]['SocialFactor'], this.personTable[i]['IncrementFactor']);

        }
        else if(this.personTable[i]['Flag']=='U' && this.personTable[i]['Id'].charAt(0) == 'T'){
                 this.personClass.insertPerson(this.personTable[i]['Name'], this.personTable[i]['Salary'], this.personTable[i]['SocialFactor'], this.personTable[i]['IncrementFactor']);
        }
        else if(this.personTable[i]['Flag']=='U'){
                 this.personClass.updatePerson(this.personTable[i]['Id'],this.personTable[i]['Name'], this.personTable[i]['Salary'], this.personTable[i]['SocialFactor'], this.personTable[i]['IncrementFactor']);
        }
        
        
      }
      for (var i = 0; i < this.deletedPersons.length; i++) {
              this.personClass.deletePerson(this.deletedPersons[i]);
      }
     }

      saveAll(){
         savePerson();
      }
}



// test the work here
let p = new PHPController();

//alert(p.getAllPersons()[0]['Id']); 
//p.insertPerson({'Id':'T1','Name':'Mohammed', 'Salary' : '123456','SocialFactor' : '4.4','IncrementFactor' : '5.5','Flag' : 'I'});

//p.updatePerson({'Id':'T1','Name':'Usamah', 'Salary' : '123','SocialFactor':'4.4','IncrementFactor':'5.5', 'Flag':'U'});

//alert(p.personTable.length);
//p.deletePerson({'Id':'T13','Name':'Usamah', 'Salary' : '123','SocialFactor':'4.4','IncrementFactor':'5.5', 'Flag':'D'});

//alert(p.personTable.length);
//alert(p.deletedAllocations);
//p.savePerson();