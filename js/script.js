// Crud js file
function saveBook() {
    var xmlhttp = new XMLHttpRequest();
    
    var name = document.forms[0].name.value;
    var author = document.forms[0].author.value;
    var company = document.forms[0].company.value;
    var launchDate = document.forms[0].launchDate.value;
    var price = document.forms[0].price.value;
    var isAvaible = document.forms[0].isAvaible.value;
    var quantity = document.forms[0].quantity.value;

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            console.log(xmlhttp.responseText);               
            swal('Livro cadastrado com sucesso');
        }
    };

    xmlhttp.open("POST", "http://www.smartsoft.com.br/webservice/restifydb/Employees/diw_livraria", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    var data = {
        "nmlivro": name,
        "nmautor": author,
        "nmeditora": company,
        "dtlancamento": launchDate,
        "vrpreco": price,
        "estadisponivel": isAvaible,
        "vrquantidade": quantity
    };

    var dataToSend = '_data=' + JSON.stringify(data);

    xmlhttp.send(dataToSend);
}

function getBooks(methodType) {
    var xmlhttp = new XMLHttpRequest();
        
    xmlhttp.onreadystatechange = processRequest;
    xmlhttp.open("GET", "http://www.smartsoft.com.br/webservice/restifydb/Employees/diw_livraria/?_view=json&_expand=yes", true);
    xmlhttp.send();

    function processRequest() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var restifyData = JSON.parse(xmlhttp.responseText);

            var rowsLength = restifyData.restify.rows.length;
            if (rowsLength > 0) {

                if (methodType == 'list') {
                    // Get the elements from listar.php screen
                    var booksTable = document.getElementById("booksTable");
                    var listBooksButton = document.getElementById("listBooks");
                    
                    // Removes the hidden class to show the table
                    booksTable.className = "table table-striped";
                    listBooksButton.className += " hidden";

                    for (j = 0; j < rowsLength; j++) {
                        // Sends the current row to the method to create a formatted table row
                        booksTable.tBodies[0].innerHTML += getFormattedTableRow(restifyData.restify.rows[j].values);
                    }
                } else if (methodType == 'delete' || 'update') {
                    // Get the elements from excluir.php screen
                    var booksList = document.getElementById("booksList");

                    booksList.innerHTML = "";
                    for (j = 0; j < rowsLength; j++) {
                        // Sends the current row to the method to create a formatted list row
                        let formattedRow = getFormattedListRow(restifyData.restify.rows[j].values, methodType);
                        
                        booksList.insertAdjacentHTML('beforeend', formattedRow);
                    }
                }
            } else {
                sweetAlert("Não exitem livros cadastrados");

                // redirect to index
                // window.location = "index.php";
            }
        }
    }
}

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

function getFormattedTableRow(currentRow) {
    var formattedRow = "";
    var isAvaibleMask = currentRow.estadisponivel.value == 1 ? "Sim" : "Não";
     
    formattedRow += "<tr>";
    formattedRow += "<td>" + currentRow.cdlivro.value + "</td>";
    formattedRow += "<td>" + currentRow.nmlivro.value + "</td>";
    formattedRow += "<td>" + currentRow.nmautor.value + "</td>";
    formattedRow += "<td>" + currentRow.nmeditora.value + "</td>";
    formattedRow += "<td>" + currentRow.dtlancamento.value + "</td>";
    formattedRow += "<td>" + currentRow.vrpreco.value + "</td>";
    formattedRow += "<td>" + isAvaibleMask + "</td>";
    formattedRow += "<td>" + currentRow.vrquantidade.value + "</td>";
    formattedRow += "</tr>";

    return formattedRow;
}

function getFormattedListRow(currentRow, methodType) {
    var formattedRow = "";

    var cdlivro = currentRow.cdlivro.value;

    if (methodType == 'delete') {
        formattedRow += '<a href="#" class="list-group-item" onclick="deleteBook('+ cdlivro +')" bookId="'+cdlivro+'">';
    } else if (methodType == 'update') {
        formattedRow += '<a href="#" class="list-group-item" data-toggle="modal" data-target="#editBook"' + 
                            'onclick="prepareModalToEdit('+ cdlivro +')" bookId="'+ cdlivro +'">';
    }

    formattedRow += currentRow.nmlivro.value;
    formattedRow += '</a>';

    return formattedRow;
}

function prepareModalToEdit(bookId) {
    var booksList = document.getElementById("booksList");
    var modal = document.getElementById('editBook');

    var xmlhttp = new XMLHttpRequest();
        
    xmlhttp.onreadystatechange = loadBookData;
    xmlhttp.open("GET", "http://www.smartsoft.com.br/webservice/restifydb/Employees/diw_livraria/" + bookId + "/?_view=json&_expand=yes", true);
    xmlhttp.send();

    function loadBookData() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var currentBookData = JSON.parse(xmlhttp.responseText).restify.rows[0].values;

            var modalContent = document.getElementById('editBook').getElementsByClassName('modal-body')[0];
            var modalForm = modalContent.childNodes[1];

            modalForm.id.value = currentBookData.cdlivro.value;
            modalForm.name.value = currentBookData.nmlivro.value;
            modalForm.author.value = currentBookData.nmautor.value;
            modalForm.company.value = currentBookData.nmeditora.value;
            modalForm.launchDate.value = currentBookData.dtlancamento.value;
            modalForm.price.value = currentBookData.vrpreco.value;
            modalForm.isAvaible.value = currentBookData.estadisponivel.value;
            modalForm.quantity.value = currentBookData.vrquantidade.value;

            console.log(currentBookData);
        }
    }

}

function updateBook(bookId) {
    var xmlhttp = new XMLHttpRequest();

    var id = document.forms[0].id.value;
    var name = document.forms[0].name.value;
    var author = document.forms[0].author.value;
    var company = document.forms[0].company.value;
    var launchDate = document.forms[0].launchDate.value;
    var price = document.forms[0].price.value;
    var isAvaible = document.forms[0].isAvaible.value;
    var quantity = document.forms[0].quantity.value;

    xmlhttp.open("PUT", "http://www.smartsoft.com.br/webservice/restifydb/Employees/diw_livraria/" + id, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    var data = {
        "nmlivro": name,
        "nmautor": author,
        "nmeditora": company,
        "dtlancamento": launchDate,
        "vrpreco": price,
        "estadisponivel": isAvaible,
        "vrquantidade": quantity
    };

    var dataToSend = '_data=' + JSON.stringify(data);

    xmlhttp.send(dataToSend);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            console.log(xmlhttp.responseText);               
            swal('Livro alterado com sucesso');
        }
    };
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