const formDelete = document.querySelector("#form-delete")
console.log('CERTO')

formDelete.addEventListener("submit", function(event) {
    const confirmation = confirm('Deseja deletar?')
    console.log('OK')
    if (!confirmation)
        event.preventDefault()
})