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

function getBooks() {
    var xmlhttp = new XMLHttpRequest();
        
    xmlhttp.onreadystatechange = processRequest;
    xmlhttp.open("GET", "http://www.smartsoft.com.br/webservice/restifydb/Employees/diw_livraria/?_view=json&_expand=yes", true);
    xmlhttp.send();

    function processRequest() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var restifyData = JSON.parse(xmlhttp.responseText);
            
            var booksTable = document.getElementById("books-table");
            var listBooksButton = document.getElementById("listBooks");

            var rowsLength = restifyData.restify.rows.length;
            if (rowsLength > 0) {

                // Removes the hidden class to show the table
                booksTable.className = "table table-striped";
                listBooksButton.className += " hidden";
                for (j = 0; j < rowsLength; j++) {

                    // Sends the current row to the method to create a formmated table row
                    booksTable.tBodies[0].innerHTML += getFormattedTableRow(restifyData.restify.rows[j].values);
                }
            } else {
                sweetAlert("Não exitem livros cadastrados");
            }
        }
    }
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