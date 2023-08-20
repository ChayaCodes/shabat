async function isShabbat() {
  //date:2023-07-18 '7' "07"
    var geonameid = '281184'; // Geoname ID for Jerusalem, Israel
    var currentDate = new Date();//הזמן הנוכחי
    // currentDate = new Date(2023,6,16,19,25,20,20)// הגדרת תאריך אחר  לשם בדיקה - יש לשנות בנפרד גם את weekday
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');//התאמה של החודש לפורמט של שתי מספרים
    var day = currentDate.getDate().toString().padStart(2, '0');//התאמה של היום לפורמט של שתי מספרים
    var date = year + '-' + month + '-' + day;//פומט תאריך - string 
    var url = 'https://www.hebcal.com/zmanim?cfg=json&geonameid=' + geonameid + '&date=' + date;//יוצר את ה url
    var weekDay = currentDate.getDay()+1;//היום בשבוע
    weekDay=6//הגדרת היום בשבוע
    console.log(url)
    if (weekDay <= 5) {//אם יום השבוע הוא לא שישי או שבת, זה בכל מקרה לא שבת
      return false;
    }
    //לעומת זאת בשישי בערב כבר שבת, ובשבת בערב כבר לא שבת
    // try - catch הכוונה
      // שאם משהו מ try
      // לא פועל, ויש שגיאה,
      // התוכנית לא קורסת אלא ה try
      // catch עובר להתבצע
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      var times = data.times;
      var sunsetTime = new Date(times.sunset);
      console.log("שקיעה"+sunsetTime)
      var tzeit7083degTime = new Date(times.tzeit7083deg);
      console.log("צאת הכוכבים" + tzeit7083degTime)
      var currentTime = currentDate;
      var isShabbat = (currentTime >= sunsetTime && weekDay===6)||(currentTime <= tzeit7083degTime&&weekDay===7);
      console.log("עכשיו " + currentTime)
      return isShabbat;
    } 
    catch (error) {
      console.error('Error fetching data from the Zmanim API:', error);
      return false; // Handle the error case as per your requirement
    }
  }
  
  isShabbat().then(result => console.log(result));