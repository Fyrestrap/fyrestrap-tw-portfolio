function sendMessage() {
    var emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var phoneRegEx = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

    var first_name    = document.getElementById("first_name").value;
    var last_name     = document.getElementById("last_name").value;
    var email_address = document.getElementById("email_address").value;
    var phone_number  = document.getElementById("phone_number").value;
    var message       = document.getElementById("message").value;

    var errors = false;
    var errorMessage = [];

    var htmlSuccessMsg;
    var htmlErrorMsg;

    if(first_name == "" || first_name.length == 0) {
      errorMessage.push("Enter your first name");
      errors = true;
    }

    if(last_name == "" || last_name.length == 0) {
      errorMessage.push("Enter your last name");
      errors = true;
    }

    if(email_address == "" || email_address.length == 0) {
      errorMessage.push("Enter your email address");
      errors = true;
    } else {
      if(!email_address.match(emailRegEx)) {
        errorMessage.push("Enter a valid email address");
        errors = true;
      }
    }

    if(phone_number == "" || phone_number.length == 0) {
      errorMessage.push("Enter your phone number");
      errors = true;
    } else {
      if(!phone_number.match(phoneRegEx)) {
        errorMessage.push("Enter a valid phone number");
        errors = true;
      }
    }

    if(message == "" || message.length == 0) {
      errorMessage.push("Enter your message");
      errors = true;
    }


    if(errors == false) {
      const xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);

          if(this.responseText == "success") {
            htmlSuccessMsg = '<div class="mt-5 p-5 rounded-xl bg-green-200 border border-green-500 text-green-900">Your message sent successfully!</div>';
            document.getElementById("emailResponse").innerHTML = htmlSuccessMsg;
            
          } else {
            htmlErrorMsg = '<div class="mt-5 p-5 rounded-xl bg-red-200 border border-red-500 text-red-900">Something is wrong. Please try again!</div>';
            document.getElementById("emailResponse").innerHTML = htmlErrorMsg;
          }
        }
      }

      let data = JSON.stringify({"first_name": first_name, "last_name": last_name, "email": email_address, "phone": phone_number, "message": message});

      xmlhttp.open("POST", "contact/email.php", true);
      xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xmlhttp.send(data);

    } else {
      htmlErrorMsg = '<div class="mt-5 p-5 rounded-xl bg-red-200 border border-red-500 text-red-900">' + errorMessage + '</div>';
      document.getElementById("emailResponse").innerHTML = htmlErrorMsg;
    }
}