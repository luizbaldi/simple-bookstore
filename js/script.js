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
        "crpreco": price,
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
                } else if (methodType == 'delete') {
                    // Get the elements from excluir.php screen
                    var booksToDelete = document.getElementById("booksToDelete");

                    booksToDelete.innerHTML = "";
                    for (j = 0; j < rowsLength; j++) {
                        // Sends the current row to the method to create a formatted list row
                        let formattedRow = getFormattedListRow(restifyData.restify.rows[j].values);
                        
                        booksToDelete.insertAdjacentHTML('beforeend', formattedRow);
                    }
                }
            } else {
                sweetAlert("Não exitem livros cadastrados");
            }
        }
    }
}

function deleteBook(currentBookId) {
    swal({
            title: "Tem certeza?",
            text: "O livro selecionado não poderá ser recuperado após excluído!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim",
            closeOnConfirm: false
        },
        function() {
            var xmlhttp = new XMLHttpRequest();

            var bookToDeleteAddress = "http://www.smartsoft.com.br/webservice/restifydb/Employees/diw_livraria/" + currentBookId;

            // Sent a DELETE request with bookId
            xmlhttp.open("DELETE", bookToDeleteAddress, true);
            xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xmlhttp.send();

            removeDeletedBookFromList(currentBookId);

            swal("Excluído!", "O Livro foi excluído com sucesso", "success");
        }
    );
}

function getFormattedTableRow(currentRow) {
    var formattedRow = "";

    formattedRow += "<tr>";
    formattedRow += "<td>" + currentRow.cdlivro.value + "</td>";
    formattedRow += "<td>" + currentRow.nmlivro.value + "</td>";
    formattedRow += "<td>" + currentRow.nmautor.value + "</td>";
    formattedRow += "<td>" + currentRow.nmeditora.value + "</td>";
    formattedRow += "<td>" + currentRow.dtlancamento.value + "</td>";
    formattedRow += "<td>" + currentRow.crpreco.value + "</td>";
    formattedRow += "<td>" + currentRow.estadisponivel.value + "</td>";
    formattedRow += "<td>" + currentRow.vrquantidade.value + "</td>";
    formattedRow += "</tr>";

    return formattedRow;
}

function getFormattedListRow(currentRow) {
    var formattedRow = "";

    var cdlivro = currentRow.cdlivro.value;

    formattedRow += '<a href="#" class="list-group-item" onclick="deleteBook('+ cdlivro +')" bookId="'+cdlivro+'">';
    formattedRow += currentRow.nmlivro.value;
    formattedRow += '</a>';

    return formattedRow;
}

function removeDeletedBookFromList(bookId) {
    var booksToDelete = document.getElementById("booksToDelete");

    // Find the selected book and removes from page
    booksToDelete.childNodes.forEach(function(currentElement, index) {
        if(currentElement.getAttribute('bookId') == bookId) {
            booksToDelete.removeChild(currentElement);
        }
    });  
}