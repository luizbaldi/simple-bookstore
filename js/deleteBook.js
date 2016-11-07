function deleteBook(bookId) {
    swal({
            title: "Tem certeza?",
            text: "O livro selecionado não poderá ser recuperado após excluído!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim",
            closeOnConfirm: false
        },
        function onConfirmMessage() {
            var xmlhttp = new XMLHttpRequest();

            var bookToDeleteAddress = "http://www.smartsoft.com.br/webservice/restifydb/Employees/diw_livraria/" + bookId;

            // Sent a DELETE request with bookId
            xmlhttp.open("DELETE", bookToDeleteAddress, true);
            xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xmlhttp.send();

            removeDeletedBookFromList(bookId);

            swal("Excluído!", "O Livro foi excluído com sucesso", "success");
        }
    );
}

function removeDeletedBookFromList(bookId) {
    var booksList = document.getElementById("booksList");

    // Find the selected book and removes from page
    booksList.childNodes.forEach(function(currentElement, index) {
        if(currentElement.getAttribute('bookId') == bookId) {
            booksList.removeChild(currentElement);
        }
    });  
}