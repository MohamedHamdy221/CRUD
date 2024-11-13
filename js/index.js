
var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescriptionInput = document.getElementById('productDescription');
var productImageInput = document.getElementById('productImage');
var productSearchInput = document.getElementById('searchInput')

var btnAdd=document.getElementById("btnAdd")
var btnUpdate=document.getElementById("Update")

var index=0;

var productArr=[];

if(localStorage.getItem("productContainer")!==null){
    productArr = JSON.parse(localStorage.getItem("productContainer"))
    displayData()
}


//addProduct()
function addProduct(){

    if(validationInput(productNameInput,"mgName") == true && validationInput(productPriceInput,"msPrice")==true && validationInput(productCategoryInput,"mgCategory")==true && validationInput(productDescriptionInput,"mgDescription")==true){
        var product={
            name:productNameInput.value,
            price:productPriceInput.value,
            category:productCategoryInput.value,
            description:productDescriptionInput.value,
            image:`images/${productImageInput.files[0]?.name}`,
        }
        
        productArr.push(product);
    
        localStorage.setItem( "productContainer"  , JSON.stringify(productArr) )
    
        clearForm()
    
        displayData()
    
    }
   
}


// clearForm()
function clearForm(){
    productNameInput.value = null
    productPriceInput.value = null
    productCategoryInput.value= null
    productDescriptionInput.value = null
    productImageInput.value=null


    productNameInput.classList.remove("is-valid")
    productPriceInput.classList.remove("is-valid")
    productCategoryInput.classList.remove("is-valid")
    productDescriptionInput.classList.remove("is-valid")
    productImageInput.classList.remove("is-valid")


}

//displayData()
function displayData(){

    var box="";

for( var i = 0 ; i < productArr.length ; i++){
    box+=`
    <tr>
                <td>${i}</td>
                <td>${productArr[i].name}</td>
                <td>${productArr[i].price}</td>
                <td>${productArr[i].category}</td>
                <td>${productArr[i].description}</td>
                <td>
                    <img width="100px" src="${productArr[i].image}" alt="image">
                </td>
                <td>
                    <button onclick="setFormeUpdate(${i})" class="btn btn-outline-warning">Update</button>
                    <button onclick="deleteForm(${i})" class="btn btn-outline-danger">Delete</button>
                </td>
            </tr>
    
    `
}
document.getElementById('dataItem').innerHTML=box;
}
//deleteForm()
function deleteForm(item){
productArr.splice(item , 1)
localStorage.setItem( "productContainer"  , JSON.stringify(productArr) )
displayData()

}
//searchItem()
function searchItem(){
    var term = productSearchInput.value;

    var box="";

for( var i = 0 ; i < productArr.length ; i++){
    if(productArr[i].name.toLocaleLowerCase().includes(term.toLocaleLowerCase())){
        box+=`
    <tr>
                <td>${i}</td>
                <td>${productArr[i].name}</td>
                <td>${productArr[i].price}</td>
                <td>${productArr[i].category}</td>
                <td>${productArr[i].description}</td>
                <td>
                    <img width="100px" src="${productArr[i].image}" alt="">
                </td>
                <td>
                    <button onclick="setFormeUpdate(${i})" class="btn btn-outline-warning">Update</button>
                    <button onclick="deleteForm(${i})" class="btn btn-outline-danger">Delete</button>
                </td>
            </tr>
    
    `
    }
}
document.getElementById('dataItem').innerHTML=box;

}

function setFormeUpdate(indexItem){
   productNameInput.value = productArr[indexItem].name
   productPriceInput.value = productArr[indexItem].price
   productCategoryInput.value = productArr[indexItem].category
   productDescriptionInput.value = productArr[indexItem].description


    btnAdd.classList.add("d-none");
    btnUpdate.classList.remove("d-none");

    index = indexItem;

}

function updateData(){
    var product={
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        description:productDescriptionInput.value,
        image:`images/${productImageInput.files[0]?.name}`,
    }

    productArr.splice(  index , 1  , product )

   displayData()

    clearForm()
   localStorage.setItem( "productContainer"  , JSON.stringify(productArr) )

}



//validationInput()
function validationInput(element , mgId){
    var text = element.value;
    var regex={
        productName:/^[A-Z][a-z]{3,8}$/,
        productPrice:/^[1-9][0-9]{2,6}$/,
        productCategory:/^(TV|Mobile|Screens|Electronic)$/i,
        productDescription:/^.{3,}$/m,
    };
   var msg =document.getElementById(mgId)
    if(regex[element.id].test(text)==true){
       element.classList.add("is-valid")
       element.classList.remove("is-invalid")
       msg .classList.add("d-none")
       return true
    }else{
       element.classList.add("is-invalid")
       element.classList.remove("is-valid")
       msg .classList.remove("d-none")
       return false
    }
} 



// function validationName(){
//      var text = productNameInput.value;
//      var regex=/^[A-Z][a-z]{3,8}$/;
//     var msgName=document.getElementById("mgName")
//      if(regex.test(text) == true){
//         productNameInput.classList.add("is-valid")
//         productNameInput.classList.remove("is-invalid")
//         msgName.classList.add("d-none")
//         return true
//      }else{
//         productNameInput.classList.add("is-invalid")
//         productNameInput.classList.remove("is-valid")
//         msgName.classList.remove("d-none")
//         return false
//      }

// } 

// function validationPrice(){
//     var text=productPriceInput.value;
//     var regex=/^[1-9][0-9]{2,5}$/
//     var msgPrice=document.getElementById("msPrice")

//     if(regex.test(text) == true){
//         productPriceInput.classList.add("is-valid")
//         productPriceInput.classList.remove("is-invalid")
//         msgPrice.classList.add("d-none")
//         return true
//     }
//     else{
//         productPriceInput.classList.add("is-invalid")
//         productPriceInput.classList.remove("is-valid")
//         msgPrice.classList.remove("d-none")
//         return false
//     }
// }

// function validationCategory(){
//     var text = productCategoryInput.value;
//     var regex=/^(TV|Mobile|Screens|Electronic)$/i;
//    var mgCategory=document.getElementById("mgCategory")
//     if(regex.test(text) == true){
//        productCategoryInput.classList.add("is-valid")
//        productCategoryInput.classList.remove("is-invalid")
//        mgCategory.classList.add("d-none")
//        return true
//     }else{
//        productCategoryInput.classList.add("is-invalid")
//        productCategoryInput.classList.remove("is-valid")
//        mgCategory.classList.remove("d-none")
//        return false
//     }
// }

// function validationDescription(){
//     var text = productDescriptionInput.value;
//     var regex=/^.{3,}$/m;
//    var mgDescription=document.getElementById("mgDescription")
//     if(regex.test(text) == true){
//        productDescriptionInput.classList.add("is-valid")
//        productDescriptionInput.classList.remove("is-invalid")
//        mgDescription.classList.add("d-none")
//        return true
//     }else{
//        productDescriptionInput.classList.add("is-invalid")
//        productDescriptionInput.classList.remove("is-valid")
//        mgDescription.classList.remove("d-none")
//        return false
//     }
// }

// function validationImage(){
//     var text = productImageInput.value;
//     var regex=/^.{1,}\.(jpg|png|avif|jpeg|svg)$/;
//     var mgImage=document.getElementById("mgImage")
//     if(regex.test(text) == true){
//        productImageInput.classList.add("is-valid")
//        productImageInput.classList.remove("is-invalid")
//        mgImage.classList.add("d-none")
//        return true
//     }else{
//        productImageInput.classList.add("is-invalid")
//        productImageInput.classList.remove("is-valid")
//        mgImage.classList.remove("d-none")
//        return false
//     }
// }