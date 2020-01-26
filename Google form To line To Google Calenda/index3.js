
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function Main() {
    // Form responses

    var form = FormApp.getActiveForm();
    var formResponses = form.getResponses();
    var formResponse = formResponses[formResponses.length - 1];
    var itemResponses = formResponse.getItemResponses();

    var startDate = new Date(itemResponses[0].getResponse());
    var endDate = new Date(itemResponses[1].getResponse());
    var location = itemResponses[2].getResponse();
    location = location.trim();
    var RoomName = itemResponses[3].getResponse();
    var NumberPeople = itemResponses[4].getResponse();
    var DepartmentName = itemResponses[5].getResponse();
    var Contract = itemResponses[6].getResponse();
    var Email = itemResponses[7].getResponse();
    var Phone = itemResponses[8].getResponse();
    var Detail = itemResponses[9].getResponse();
    var Type = itemResponses[10].getResponse();
    var Sales = itemResponses[11].getResponse();

    var Id = "o42m5roqoe650tnu32c4n68au8@group.calendar.google.com"; //defualt
    var description = "";    var titles = "";
    if (location.substring(0, 1) === '1') {
        Id = "o42m5roqoe650tnu32c4n68au8@group.calendar.google.com";
    } else if (location.substring(0, 1) == '2') {
        Id = "7r5vn26prq5gqt5rjjf4r8g1jc@group.calendar.google.com";
    } else if (location.substring(0, 1) == '3') {
        Id = "so3025k394qinp945qmrq7irc8@group.calendar.google.com";
    }
    var calendar = CalendarApp.getCalendarById(Id);


    //  ปรับข้อความ
    for (var j = 0; j < parseInt(itemResponses.length); j++) {
        if (itemResponses[j].getItem() != undefined && itemResponses[j].getItem() != '') {
        //fix
          if(j == 3 ){
                  titles += itemResponses[j].getResponse();
          }else if(j == 4){
                   titles += '/ '+itemResponses[j].getResponse();
           }else if(j == 5){
                   titles += '/ '+itemResponses[j].getResponse();
          } else if(j == 9){
                   titles += '/ '+itemResponses[j].getResponse();
          }           
           
        } 
    }

//var test = parseInt(itemResponses.length);

    //  ปรับข้อความ Detail
    for (var j = 0; j < parseInt(itemResponses.length); j++) {
        if (itemResponses[j].getResponse() !== undefined && itemResponses[j].getResponse() !== '') {
        //fix
          if(j == 0){
                     description += '\n' + 'วันที่ : ' + startDate.getDate() + '/' + months[startDate.getMonth()] + '/' + startDate.getFullYear()
          }else if(j == 1){
                      description += '  -  ' +  + endDate.getDate() + '/' + months[endDate.getMonth()] + '/' + endDate.getFullYear();
          }else if(j == 2){
                 description += '\n' + 'สถาณที่: ' + location.substring(1);
          }else{
                description += '\n' + itemResponses[j].getItem().getTitle()+' : ' + itemResponses[j].getResponse();
          }          
           
        } 
    }
  


 
    calendar.createEvent(titles, startDate, endDate, { sendInvites: true, description: description });


    var obj_Message = {
        startDate: startDate,
        endDate: endDate,
        location: location,
        RoomName: RoomName,
        NumberPeople: NumberPeople,
        DepartmentName: DepartmentName,
        Contract: Contract,
        Email: Email,
        Phone: Phone,
        Detail: Detail,
        Type: Type,
        Sales: Sales,
        Item: itemResponses,
    }

    generateMessage(obj_Message);


}


function generateMessage(obj_Message) {
 
 
    var start_year = obj_Message.startDate.getFullYear();
    var start_date = obj_Message.startDate.getDate();
    var start_month = obj_Message.startDate.getMonth();


    var end_year = obj_Message.endDate.getFullYear();
    var end_date = obj_Message.endDate.getDate();
    var end_month = obj_Message.endDate.getMonth();
  
    var text_data = '';


    //  Massage
    text_data += 'รายการแจ้งเตือนปฏิทิน \n';

    for (var j = 0; j < parseInt(obj_Message.Item.length); j++) {
         if (obj_Message.Item[j].getResponse() !== undefined && obj_Message.Item[j].getResponse() !== '') {
        //fix
          if(j == 0){
                     text_data += '\n' + 'วันที่ : ' + start_date + '/' + months[start_month] + '/' + start_year
          }else if(j == 1){
                      text_data += '  -  '  + end_date + '/' + months[end_month] + '/' + end_year
          }else if(j == 2){
                 text_data += '\n' + 'สถาณที่: ' + obj_Message.location.substring(1);
          }else{
                text_data += '\n' + obj_Message.Item[j].getItem().getTitle()+' : ' + obj_Message.Item[j].getResponse();
          }          
         }
    }

    sendNotification(text_data);
}
function sendNotification(text) {
    var formData = {
        'message': text,
    };
    var token = 'epnjSHAQXl9dQnW6HCHm9e42qW6Kxd5zwiEVRiayFm6';
    var options = {
        'method': 'post',
        'headers': { 'Authorization': "Bearer " + token },
        'contentType': 'application/x-www-form-urlencoded',
        'payload': formData
      ,
    };
    UrlFetchApp.fetch('https://notify-api.line.me/api/notify', options);
}