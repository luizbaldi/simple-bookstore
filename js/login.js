function doLogin() {
	var xmlhttp = new XMLHttpRequest();
        
    xmlhttp.onreadystatechange = processRequest;
    xmlhttp.open("GET", "http://smartsoft.com.br/webservice/restifydb/Employees/diw_seguranca/?_view=json&_expand=yes", true);
    xmlhttp.send();

    function processRequest() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var restifyData = JSON.parse(xmlhttp.responseText);

            var rowsLength = restifyData.restify.rows.length;

            var user = document.forms[0].user.value;
            var password = document.forms[0].password.value;

            var isValidLogin = restifyData.restify.rows.some(function(currentRow) {
            	var currentLogin = currentRow.values.login.value;
            	var currentPassword = currentRow.values.senha.value;

            	return user == currentLogin && password == currentPassword;
            });

            if (isValidLogin) {
            	location.href = "home.php";
            } else {
            	swal("O login não é válido");
            }
        }
    }
}