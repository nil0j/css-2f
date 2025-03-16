const form = document.getElementsByTagName("form")[0]


form.onsubmit = e => {
    e.preventDefault()
    Swal.fire({
        title: "Datos embiadoss - el barto",
        icon: "success",
        draggable: true
    })
}
