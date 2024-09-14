function sendMail() {
    const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,  // Changed subject to phone for clarity
        message: document.getElementById("message").value,
    };

    emailjs.send("service_3209sbj", "template_bo460hb", params)
    .then(
        response => {
            alert("Email sent successfully!");
        }
    ).catch(
        error => {
            console.error("Email send failed: ", error);
            alert("Failed to send email. Please try again.");
        }
    );
}
