let button=document.querySelector("button")
let date=document.querySelector("input")
let showResult=document.querySelector("h2")
let nearestPalindromeOutput=document.querySelector(".output-para")
let waitSec=document.querySelector(".calculating")

var dateArr=[]
let dateObj={}
let dateVariationsArr=[]
let palindromeStatus=false
let nearestPlaindromeStatus=false
let noOfDays=0

function createDateObj(){
  dateObj={
    day:dateArr[2],
    month:dateArr[1],
    year:dateArr[0]
  }
}

function dateReverse(dateStr){
  let dateStrArr=dateStr.split('')
  let dateReversedArr=dateStrArr.reverse()
  let reversedDate=dateReversedArr.join('')
  return reversedDate
}

function dateVariations(year,month,day){
  let ddmmyyyy=""+day+month+year
  let mmddyyyy=""+month+day+year
  let mmyyyydd=""+month+year+day
  let yyyymmdd=""+year+month+day
  let yyyyddmm=""+year+day+month
  let ddyyyymm=""+day+year+month
  let ddmmyy=""+day+month+year.slice(-2)
  let mmddyy=""+month+day+year.slice(-2)
  let mmyydd=""+month+year.slice(-2)+day
  let yymmdd=""+year.slice(-2)+month+day
  let yyddmm=""+year.slice(-2)+day+month
  let ddyymm=""+day+year.slice(-2)+month
  
  return [ddmmyyyy,mmddyyyy,mmyyyydd,yyyymmdd,yyyyddmm,ddyyyymm,ddmmyy,mmddyy,mmyydd,yymmdd,yyddmm,ddyymm]
}

function isPalindrome(datesArr){
  for(let i=0;i<datesArr.length;i++){
   if(datesArr[i]===dateReverse(datesArr[i])){
     return true
   }
  }
}

function getMonthDays(month,year){
  if(parseInt(month)%2===0){
    if(month===2){
      if(parseInt(year)%4===0 || parseInt(year)%400){
         monthDays=29
      }
      else{
        monthDays=28
      }
    }
    else if(month===8 || month===12){
      monthDays=31
    }
    else{
      monthDays=30
    }
  }
  else{
    monthDays=31
  }
  return monthDays
}

function nearestPalindrome(userDOB){
    for(let k=parseInt(userDOB.year);k<=new Date().getFullYear();k++){
      let month=0
      if(k===parseInt(userDOB.year)){
         month=parseInt(userDOB.month)
      }
      else{
         month=1
      }

      for(let i=month; i<=12;i++){
          let day=0
          if(i===parseInt(userDOB.month)){
             day=parseInt(userDOB.day)+1
          }
          else{
             day=1
          }
          getMonthDays(i,k)

          for(let j=day;j<=monthDays;j++){
            if(!nearestPlaindromeStatus){
              tempDateStr=""
              k=""+k
              if(j<10){
                j="0"+j
              }
              if(i<10){
              i="0"+i
              }

              tempDateArr=dateVariations(k,i,j)
              nearestPlaindromeStatus=isPalindrome(tempDateArr)
              console.log(tempDateArr)

              if(nearestPlaindromeStatus===true){
                  dateObj.day=j
                  dateObj.month=i
                  dateObj.year=""+k
              }
                  j=parseInt(j)
                  i=parseInt(i)
                  k=parseInt(k)

                  noOfDays++
            }
          }
      }
    }
}

function showIfPalindrome(){
  wait()
  setTimeout(()=>{
    waitSec.classList.add("display-none")
  if(palindromeStatus){
    showResult.innerHTML="Congrats ! Your Birthday Is A Palindrome"
    showResult.style.color="green"
  }
  else{
    if(date.value===""){
    showResult.innerHTML="Please Check The Input"
    }
    else{
    showResult.innerHTML="Sorry ! Your Birthday Is Not A Palindrome"
    showResult.style.color="red"
  }

nearestPalindrome(dateObj)
    if(nearestPlaindromeStatus){
       nearestPalindromeOutput.innerHTML=`Nearest Palindrome Date to your DOB is ${dateObj.day}-${dateObj.month}-${dateObj.year}.
       You were born ${noOfDays} Day/Days Early`
       nearestPlaindromeStatus=false
       noOfDays=0
    }
  }
  },3000)
}

function wait(){
waitSec.classList.add("display-block")
}

function clickHandler(){
  dateArr=date.value.split('-')
  createDateObj()
  dateVariationsArr=dateVariations(dateObj.year,dateObj.month,dateObj.day)
  palindromeStatus=isPalindrome(dateVariationsArr)
  showIfPalindrome()
}


button.addEventListener('click',clickHandler)

