
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function Main() {
    // Form responses

    var form = FormApp.getActiveForm();
    var formResponses = form.getResponses();
    var formResponse = formResponses[formResponses.length - 1];
    var itemResponses = formResponse.getItemResponses();
    var startDate = new Date(itemResponses[0].getResponse());
    var Recorder = new Date(itemResponses[1].getResponse());
    var around = itemResponses[2].getResponse();

    var Id = "a3ss5ge5scg3v7bratp9l0d7u0@group.calendar.google.com"; //defualt
    var description = "";  
    var titles = "";
 
     
    var calendar = CalendarApp.getCalendarById(Id);


    //  ปรับข้อความ
  
    titles += around;
 
    //  ปรับข้อความ Detail
    for (var j = 0; j < parseInt(itemResponses.length); j++) {
        description += '\n' + itemResponses[j].getItem().getTitle()+' : ' + itemResponses[j].getResponse();   
    }
  

    calendar.createAllDayEvent(titles, startDate, { sendInvites: true, description: description });
 
    generateMessage()


}


function generateMessage() {
 
 
    var form = FormApp.getActiveForm();
    var formResponses = form.getResponses();
    var formResponse = formResponses[formResponses.length - 1];
    var itemResponses = formResponse.getItemResponses();
    var startDate = new Date(itemResponses[0].getResponse());
    var Recorder = new Date(itemResponses[1].getResponse());
    var around = itemResponses[2].getResponse();

  
    var text_data = '';


    //  Massage
    text_data += 'รายการแจ้งเตือนปฏิทิน \n';
    for (var j = 0; j < parseInt(itemResponses.length); j++) {
        text_data += '\n' + itemResponses[j].getItem().getTitle()+' : ' + itemResponses[j].getResponse();   
    
    }

    sendNotification(text_data);
}
function sendNotification(text) {
    var formData = {
        'message': text,
    };
    var token = 'Yf1QHhzlBTEPDRaJnh9Syt6gHigqgYmNSctj4JguiHw';
    var options = {
        'method': 'post',
        'headers': { 'Authorization': "Bearer " + token },
        'contentType': 'application/x-www-form-urlencoded',
        'payload': formData
      ,
    };
    UrlFetchApp.fetch('https://notify-api.line.me/api/notify', options);
}