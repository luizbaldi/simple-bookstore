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
            getBooks('update');
        }
    };
}
