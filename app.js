// const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";
const BASE_URL="https://latest.currency-api.pages.dev/v1/currencies/";
// const BASE_URL =
// "https://2024-03-06.currency-api.pages.dev/v1/currencies/";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

// to print country and country code in console
// for(code in countryList){
//     console.log(codes, countryList[codes]);
// }

for(let select of dropdowns){
    for(currCode in countryList){
        // to add option one by one
        let newOption=document.createElement("option");
        // when option disble from html and if we want to auto select then
          newOption.innerText=currCode;
          newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
      
        // newOption add in select
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        // when select change then call update flag
        updateFlag(evt.target);
        //property of an event object that refers to the element that
        //  triggered the event.
    })
}
// we want to change country currency then flag also update
const updateFlag=(element)=>{
    // when we select in app then on the basis of select our element
    // he Element object represents an HTML element, like P, DIV, A,
    //  TABLE, or any other HTML element.
    // console.log(element);
    // ectract currenycode from element
    let currCode=element.value;
    // console.log(currCode);//currency code in console when select
    //on the basis of currencycode our image means flag
    // currencycode se currencycode
    let countryCode=countryList[currCode];
    let newScr=`https://flagsapi.com/${countryCode}/flat/64.png`;
    // image in select parent so select-container is parent
    // element.parentElement.querySelectorAll("img");
   let img= element.parentElement.querySelector("img");
//    in this image source eqauls newsouce means value of img.src=newsource value
   img.src=newScr;
}

// The preventDefault() method cancels the event if it is cancelable,
//  meaning that the default action that belongs to the event will not
//  occur. For example, this can be useful when: Clicking on a "Submit"
//  button, prevent it from submitting a form. Clicking on a link, 
// prevent the link from following the URL.

// btn.addEventListener("click", async(evt)=>{
//     evt.preventDefault();
//     // to access amount whatever we enter here
//     let amount=document.querySelector(".amount input");
//      let amtVal=amount.value;
//     //  console.log(amtVal);to see value in console what we enter 
//      if(amtVal===""||amtVal<1){
//         amtVal=1;
//         amount.value="1";
//      };

//     //  console.log(fromCurr,toCurr); //  we need value so
//     // console.log(fromCurr.value,toCurr.value);
//     // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//     //  when we send request to this URL then get our exchange rate
//     // let response=await fetch(URL);// to use await function must be async
//     // console.log(response);
//     const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
//   let response = await fetch(URL);
//     //   console.log(response);// get reponse 200 means all work well
//       let data = await response.json();
//       console.log(data);// to see data on console
//     //   rate available on tocurrency
//     //   let rate = data[toCurr.value.toLowerCase()];
//     //   console.log(rate);    
//     //   let finalAmount=amtVal*rate;
//       let finalAmount = (data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]*parseInt(amount.value)).toFixed(2);
//       console.log(finalAmount);

//     //   console.log(finalAmount);
//     // msg.innerText=`1USD=80INR`; // message like this    
//     msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;
// });
updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal===""||amtVal<1){
        amtVal=1;
        amount.value="1";
     };
     const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
     let response = await fetch(URL);
     let data = await response.json();
     let finalAmount = (data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]*parseInt(amount.value)).toFixed(2);
      console.log(finalAmount);
      msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;   
};
// our default is usd to inr conversion so that we want to display that
// on start
// when click then update exchnage rate
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    evt.updateExchangeRate();
});
// when first time our document load 
window.addEventListener("load",()=>{
    updateExchangeRate();
});


