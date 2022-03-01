// ----------------error msg--------------------
const errorMsg = document.getElementById("error-msg");
// --------- spinner----------
function displaySpinner(style){
    document.getElementById("spinner").style.display = style;
}
// --------- card group visibility style---------
function displayPhoneStyle(cardStyle){
    document.getElementById("card-group").style.visibility = cardStyle;
}
// ------------------------search button-----------
const searchPhone = () =>{
    const inputField = document.getElementById("input-field");
    const inputValue = inputField.value ;
    inputField.value = '';
    //---------- dynamic url with case sensitive
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue.toLowerCase()}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // --------- error msg condition-------
        if(data.data.length == 0 || data.data == ""){
            errorMsg.innerText = "Please Input a Valid Value"; 
        }
        else{
            errorMsg.innerText = "";
            displayPhone(data.data)
        }
    })  
    displaySpinner("block") ;
    displayPhoneStyle("hidden");
}

//---------------- display phone ---------
const displayPhone = phones =>{
    // display 20 items 
    const phoneList = phones.slice(0, 20);
    const cardGroup = document.getElementById("card-group");
    cardGroup.textContent = "";
    phoneList.forEach( phone =>{
    const div = document.createElement("div");
    div.className = "col-md-4";
    div.innerHTML = `
    <div class="card mb-4">
        <div class="text-center mt-3">
        <img src="${phone.image}" class="card-img-top w-50"  alt="...">
        </div>
        <div class="card-body text-center">
        <h5 class="card-title">${phone.phone_name}</h5>
        <h5 class="card-title">${phone.brand}</h5>
        <button onclick="phoneDetails('${phone.slug}')" href="#" class="btn btn-primary mt-3">Details</button>
        </div>
    </div>
    `
     cardGroup.appendChild(div);

    })
    displaySpinner("none") ;
    displayPhoneStyle("visible")
}
//---------------------- phone details by id---------------
const phoneDetails = details =>{
    const url = `https://openapi.programming-hero.com/api/phone/${details}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
//-------------- display phone details

const displayPhoneDetails = phoneDetails =>{
    // ------------------- phone detail container---
    const phoneDetail = document.getElementById("phone-detail");
    phoneDetail.textContent = "";
    // ---------- create new date and append--
    const div = document.createElement("div");
    div.className = "col-md-12";
    div.innerHTML = `
    <div class="card my-3 mx-auto" style="max-width: 640px;">
  <div class="row g-0 p-3">
    <div class="col-md-4">
      <img src="${phoneDetails.image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h4 class="card-title">${phoneDetails.name}</h4>
        <h6 class="card-title">${phoneDetails.releaseDate ? phoneDetails.releaseDate :"Release date not found"}</h6>
         <h5>Main Features</h5>
        <ul>
         <li>Storage :${phoneDetails.mainFeatures.storage}</li>
         <li>Display Size :${phoneDetails.mainFeatures.displaySize}</li>
         <li>ChipSet :${phoneDetails.mainFeatures.chipSet}</li>
         <li>Memory :${phoneDetails.mainFeatures.memory}</li>
         </ul>
         <h5>Sensors</h5>
         <ul>
          <li>${phoneDetails.mainFeatures.sensors[0]}</li>
          <li>${phoneDetails.mainFeatures.sensors[3]}</li>
          <li>${phoneDetails.mainFeatures.sensors[4]}</li>
         </ul>
          <h5>Others</h5>
         <ul>
          <li>Bluetooth :${phoneDetails?.others?.Bluetooth ? phoneDetails?.others?.Bluetooth : "No found"}</li>
          <li>${phoneDetails?.others?.GPS ? phoneDetails.others.GPS : "Not Found"}</li>
          <li>${phoneDetails?.others?.NFC ? phoneDetails.others.NFC: "Not Found"}</li>
         </ul>
      </div>
    </div>
  </div>
</div>
`
    phoneDetail.appendChild(div);
}
