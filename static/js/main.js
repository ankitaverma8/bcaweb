const regform = document.getElementById("regform");
const questionform = document.getElementById("questionform");

const loginform = document.getElementById("loginform");
const msg = document.getElementById("msg");
const adminloginform = document.getElementById("adminloginform");




if (regform){


    regform.addEventListener('submit',async (e)=>{
        e.preventDefault();
    console.log("regform submit hit");

const user = new FormData(regform);
try {
    

const res = await fetch('/register',{
    method:'POST',
    body:user
})


const data = await res.json();


if (data.success == false) {
        Swal.fire({
  title: "Registartion failed",
  icon: "error",
  text:data.message,
  confirmButtonText:"Tray again!"
})
}

if (data.success) {
    


Swal.fire({
  title: "Registartion successfull",
  text: "You can login now",
  icon: "success",
  confirmButtonText:"Login"
}).then((result)=>{
    if (result.isConfirmed) {
        location.href="/"
    };
});

    }
    
    } catch (error) {
        console.log(error);
        
    Swal.fire({
  title: "Registartion failed",
  text:"error in code",
  icon: "error",
  confirmButtonText:"Tray again!"
})
}

    })
    
}






if (loginform){


    loginform.addEventListener('submit',async (e)=>{
        e.preventDefault();

const user = new FormData(loginform);

try {
    

const res = await fetch('/login',{
    method:'POST',
    body:user
})

const data = await res.json();

console.log(data);

if (data.success == false) {
        Swal.fire({
  title: "Login failed",
  text:data.message,
  icon: "error",
  confirmButtonText:"Tray again!"
})
}

if (data.success) {

    window.location.href="/home"

    }
    
    } catch (error) {
    Swal.fire({
  title: "Login failed",
  icon: "error",
  confirmButtonText:"Try again!"
})
}

    })
    
}


if (adminloginform){


    adminloginform.addEventListener('submit',async (e)=>{
        e.preventDefault();

const admin = new FormData(adminloginform);

try {
    

const res = await fetch('/adminlogin',{
    method:'POST',
    body:admin
})

const data = await res.json();

console.log(data);

if (data.success == false) {
        Swal.fire({
  title: "admin Login failed",
  text:data.message,
  icon: "error",
  confirmButtonText:"Try again!"
})
}

if (data.success) {

    window.location.href="/adminhome"

    }
    
    } catch (error) {
    Swal.fire({
  title: "admin Login failed",
  icon: "error",
  confirmButtonText:"Try again!"
})
}

    })
    
}



if (questionform){


    questionform.addEventListener('submit',async (e)=>{
        e.preventDefault();
    console.log("Question form submit hit");

const question = new FormData(questionform);
try {
    

const res = await fetch('/questions',{
    method:'POST',
    body:question
})


const data = await res.json();


if (data.success == false) {
        Swal.fire({
  title: "Failed",
  icon: "error",
  text:data.message,
  confirmButtonText:"Try again!"
})
}

if (data.success) {
    


Swal.fire({
  title: "Questio added successfull",
  text: "success",
  icon: "success",
  confirmButtonText:"ok"
}).then((result)=>{
    if (result.isConfirmed) {
        location.href="/questions"
    };
});

    }
    
    } catch (error) {
        console.log(error);
        
    Swal.fire({
  title: "Failed",
  text:"error in code",
  icon: "error",
  confirmButtonText:"Try again!"
})
}

    })
    
}






