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
let noOfMonths=0
let nearestPalindromeDate={
  day:"",
  month:"",
  year:""
}


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
  return [ddmmyyyy,mmddyyyy,mmyyyydd,yyyymmdd,yyyyddmm,ddyyyymm]
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
      if(parseInt(year)%4===0){
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
    for(let k=parseInt(userDOB.year);k<=2021;k++){
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
             day=parseInt(userDOB.day)
          }
          else{
             day=1
          }
          getMonthDays(i,k)

          for(let j=day;j<=monthDays;j++){
            if(!nearestPlaindromeStatus){
              tempDateStr=""

              if(j<10){
                j="0"+j
              }
              if(i<10){
              i="0"+i
              }

              tempDateStr=""+k+i+j
              nearestPlaindromeStatus=isPalindrome([tempDateStr])

              if(nearestPlaindromeStatus===true){
                  nearestPalindromeDate.day=j
                  nearestPalindromeDate.month=i
                  nearestPalindromeDate.year=""+k
              }
                  j=parseInt(j)
                  i=parseInt(i)
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
       nearestPalindromeOutput.innerHTML=`Nearest Palindrome Date to your DOB is ${nearestPalindromeDate.year}-${nearestPalindromeDate.month}-${nearestPalindromeDate.day}.
       You were born ${noOfDays-1} Day/Days Early`
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

