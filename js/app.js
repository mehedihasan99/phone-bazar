// ----------------error msg--------------------
const errorMsg = document.getElementById("error-msg");
// ------------------------search button-----------
const searchPhone = () =>{
    const inputField = document.getElementById("input-field");
    const inputValue = inputField.value ;
    inputField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue.toLowerCase()}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(data.data.length == 0){
            errorMsg.innerText = "Please Input a Valid Value"
        }
        else{
            displayPhone(data.data)
        }
    })   
}
// display phone 
const displayPhone = phones =>{
    const phoneList = phones.slice(0, 20);
    const cardGroup = document.getElementById("card-group");
    phoneList.forEach( phone =>{
    // console.log(phone.slug);
    const div = document.createElement("div");
    div.className = "col-lg-4";
    // console.log(phone.brand);
    div.innerHTML = `
    <div class="card mb-4">
        <div>
        <img src="${phone.image}" class="card-img-top"  alt="...">
        </div>
        <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <h5 class="card-title">${phone.brand}</h5>
        <button onclick="phoneDetails('${phone.slug}')" href="#" class="btn btn-primary mt-3">Details</button>
        </div>
    </div>
    
    `
     cardGroup.appendChild(div);
    })
}
//---------------------- phone details by id---------------
const phoneDetails = details =>{
    const url = `https://openapi.programming-hero.com/api/phone/${details}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}
// display phone details

const displayPhoneDetails = phoneDetails =>{
    console.log(phoneDetails.mainFeatures);
    const phoneDetail = document.getElementById("phone-detail");
    const div = document.createElement("div");
    div.className = "col-lg-12";
    div.innerHTML = `
    <div class="card mx-auto w-25 mt-4">
        <img src="${phoneDetails.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${phoneDetails.name}</h5>
        <h6 class="card-title">${phoneDetails.releaseDate ? phoneDetails.releaseDate :"Release date not found"}</h6>
        <h5>Main Features</h5>
        <ul>
        <li>Storage :${phoneDetails.mainFeatures.storage}</li>
        <li>${phoneDetails.mainFeatures.displaySize}</li>
        <li>${phoneDetails.mainFeatures.chipSet}</li>
        <li>${phoneDetails.mainFeatures.}</li>
        <li>${phoneDetails.mainFeatures.storage}</li>
        </ul>
        </div>
    </div>
    `
    phoneDetail.appendChild(div);
}