// Task 1 - Repeating Numbers 

var repeatNumbers = function(data) {
    // Put your solution here
   var arrLength = data.length;
    
    var strOutput = "";

    for (let i = 0; i < arrLength; i++) {
        
        if (i === 0) {
            for (let count = 0; count < data[i][1]; count++) {
                strOutput = strOutput.toString() + data[i][0].toString();
            
            }
        }  else {
            strOutput = strOutput + ","

            for (let count1 = 0; count1 < data[i][1]; count1++) {
                strOutput = " " + strOutput.toString() + data[i][0].toString();
            }
        }
    }
    
  return strOutput;
  
  };
  
  console.log(repeatNumbers([[1, 10]]));
  console.log(repeatNumbers([[1, 2], [2, 3]]));
  console.log(repeatNumbers([[10, 4], [34, 6], [92, 2]]));



  // Task 2 - Conditional Sum
var conditionalSum = function(values, condition) {
    // Your code here
  
    var array1 = values;
    var arraylength = values.length;
    var sum = 0;
  
    if (condition === "even") {
      
      for(i=0; i<arraylength; i++){
          if(array1[i] % 2 == 0) {
              sum = sum + array1[i];
          }
      }
   
    } else {
      for(j=0; j<arraylength; j++){
          if(array1[j] % 2 !== 0) {
              sum = sum + array1[j];
          }
      }
    }
  
    return sum;
  
  };
  
  console.log(conditionalSum([1, 2, 3, 4, 5], "even"));
  console.log(conditionalSum([1, 2, 3, 4, 5], "odd"));
  console.log(conditionalSum([13, 88, 12, 44, 99], "even"));
  console.log(conditionalSum([], "odd"));
  
  
  // Task 3 - Talking Calendar
  
  var talkingCalendar = function(date) {
      // Your code here
  
      var yr = date.substring(0,4);
      var mnth = date.substring(5,7);
      var day = date.substring(8,10);
  
      var suffix = "th";
  
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
      if (day === "01" || day === "21" || day === "31" ) {
          suffix = "st";
  
      } else if (day === "02" || day === "22") {
          suffix = "nd";
      }  else if (day === "03" || day === "23") {
          suffix = "rd";
      }
  
      if (Number(day) < 10) {
          day = date.substring(9,10);
      }
      return (months[mnth-1] + " " + day + suffix + ", " + yr);
    };
    
    console.log(talkingCalendar("2017/12/02"));
    console.log(talkingCalendar("2007/11/11"));
    console.log(talkingCalendar("1987/08/24"));
  
    
    
    
    
    // Task 4 - Challenge Calculator
  
    var calculateChange = function(total, cash) {
      // Your code here
      var num = 2;
      var diff = cash - total;
      var tmp = 0;
      var objChange = {};
      if (diff === 0 ) {
          return "No change";
      } else {
          do { 
              if (diff >= 2000) {
                  tmp = diff/2000;
                  diff = diff % 2000;
                  tmp = Math.trunc(tmp);
                  objChange["twenty"] = tmp;
                  
                  if(diff===0) {
                      num=1;
                  }
  
              } else if (diff >= 1000) {
                  tmp = diff/1000;
                  diff = diff % 1000;
                  tmp = Math.trunc(tmp);
                  objChange["ten"] = tmp;
  
                  if(diff===0) {
                      num=1;
                  }
  
              } else if (diff >= 500) {
                  tmp = diff/500;
                  diff = diff % 500;
                  tmp = Math.trunc(tmp);
                  objChange["five"] = tmp;
                  
                  if(diff===0) {
                      num=1;
                  }
  
              } else if (diff >= 200) {
                  tmp = diff/200;
                  diff = diff % 200;
                  tmp = Math.trunc(tmp);
                  objChange.twoDollar = tmp;
                  
                  if(diff===0) {
                      num=1;
                  }
  
              } else if (diff >= 100) {
                  tmp = diff/100;
                  diff = diff % 100;
                  tmp = Math.trunc(tmp);
                  objChange["dollar"] = tmp;
  
                  if(diff===0) {
                      num=1;
                  }
  
              } else if (diff >= 25) {
                  tmp = diff/25;
                  diff = diff % 25;
                  tmp = Math.trunc(tmp);
                  objChange["quarter"] = tmp;
                  
                  if(diff===0) {
                      num=1;
                  }
  
              } else if (diff >= 10) {
              tmp = diff/10;
                  diff = diff % 10;
                  tmp = Math.trunc(tmp);
                  objChange["dime"] = tmp;
                  
                  if(diff===0) {
                      num=1;
                  }
  
              } else if (diff >=5 ) {
                  tmp = diff/5;
                  diff = diff % 5;
                  tmp = Math.trunc(tmp);
                  objChange["nickel"] = tmp;
  
                  if(diff===0) {
                      num=1;
                  }
              
              } else if (diff >=1 ) {
                  tmp = diff/1;
                  diff = diff % 1;
                  tmp = Math.trunc(tmp);
                  objChange["penny"] = tmp;
                  num = 1;
              }
          }  while (num === 2);
      }
     
      return objChange;
    };
    
    console.log(calculateChange(1787, 2000));
    console.log(calculateChange(2623, 4000));
    console.log(calculateChange(501, 1000));