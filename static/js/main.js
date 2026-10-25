const regform = document.getElementById("regform");
const loginform = document.getElementById("loginform");
const msg = document.getElementById("msg");



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
