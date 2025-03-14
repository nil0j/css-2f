const submitButton = document.getElementById("contact-form").querySelector(".submit")


submitButton.onclick = e => {
    e.preventDefault()
    Swal.fire({
        title: "Datos embiadoss - el barto",
        icon: "success",
        draggable: true
    })
}
