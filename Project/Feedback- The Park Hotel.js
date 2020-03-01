
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function Main() {
    // Form responses

    var form = FormApp.getActiveForm();
    var formResponses = form.getResponses();
    var formResponse = formResponses[formResponses.length - 1];
    var itemResponses = formResponse.getItemResponses();
  
   
    var Title_Choise =   itemResponses[0].getItem().asGridItem().getRows()
    var Choise = itemResponses[0].getResponse();
 
    var Id = "3hnh7p1svoqgcoh793drk29c8c@group.calendar.google.com"; //defualt
    var description = "";  
    var titles = "The Park Hotel";
    
    var calendar = CalendarApp.getCalendarById(Id);


    
    //  ปรับข้อความ Detail
    for (var j = 0; j < parseInt(itemResponses.length); j++) {
       if(itemResponses[0].getItem().asGridItem().getRows().length>0){
        description += '\n' + Title_Choise[j]+' : ' + Choise[j];   
       } 
    }

      for (var j = 1; j < parseInt(itemResponses.length); j++) {
        description += '\n' + itemResponses[j].getItem().getTitle()+' : ' + itemResponses[j].getResponse();   
    }
  
  
  calendar.createAllDayEvent(titles,
    new Date(),
    { sendInvites: true, description: description });
  
 
    generateMessage()


}


function generateMessage() {
 
 
    var form = FormApp.getActiveForm();
    var formResponses = form.getResponses();
    var formResponse = formResponses[formResponses.length - 1];
    var itemResponses = formResponse.getItemResponses();
  
   
    var Title_Choise =   itemResponses[0].getItem().asGridItem().getRows()
    var Choise = itemResponses[0].getResponse();

  
    var text_data = '';

    //  Massage
    text_data += 'รายการแจ้งเตือนปฏิทิน \n';
    text_data += '(The Park Hotel)  \n';
    for (var j = 0; j < parseInt(itemResponses.length); j++) {
       if(itemResponses[0].getItem().asGridItem().getRows().length>0){
         text_data += '\n ' + Title_Choise[j]+' : ' + Choise[j];   
       } 
    }

      for (var j = 1; j < parseInt(itemResponses.length); j++) {
        text_data += '\n' + itemResponses[j].getItem().getTitle()+' : ' + itemResponses[j].getResponse();   
    } 

    sendNotification(text_data);
}
function sendNotification(text) {
    var formData = {
        'message': text,
    };
    var token = 'pHxQfoJHaItyES8zYqZp6E0Hlonqxsz5qn6YqzW0wpA';
    var options = {
        'method': 'post',
        'headers': { 'Authorization': "Bearer " + token },
        'contentType': 'application/x-www-form-urlencoded',
        'payload': formData
      ,
    };
    UrlFetchApp.fetch('https://notify-api.line.me/api/notify', options);
}