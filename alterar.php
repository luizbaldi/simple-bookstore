<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Incluir Dados - Livraria</title>

	<!-- CSS Files -->
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/sweetalert.css">
	
	<!-- JavaScript Files -->
	<script src="js/sweetalert.min.js"></script>
	<script src="js/script.js"></script>
	<script src="js/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>

</head>
<body onload="getBooks('update')">
	<!-- Page Header -->
	<?php 
		require_once('templates/header.php'); 
	?>
    
    <div class="container">
	    <div class="jumbotron text-center">
	    	<h3>Selecione o livro para editar</h3>
		    
		    <div class="row">
	    		<div class="col-xs-2"></div>
	    		<div class="col-xs-8">
			    	<div class="list-group" id="booksList">
			    	</div>	
	    		</div>
	    		<div class="col-xs-2"></div>
	    	</div>
	    </div>

	    <!-- Modal -->
		<div class="modal fade" id="editBook" role="dialog">
			<div class="modal-dialog">

				<!-- Modal content-->		
				<div class="modal-content">
					<div class="modal-header text-center">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title">Editar livro</h4>
					</div>
					<div class="modal-body">
						<form>
							<div class="input-group">
								<span class="input-group-addon">ID </span>
								<input type="text" class="form-control" name="id" disabled="disabled">
							</div>
							<br />
				    		<div class="input-group">
								<span class="input-group-addon">Nome </span>
								<input type="text" class="form-control" name="name">
							</div>
							<br />
							<div class="input-group">
								<span class="input-group-addon">Autor </span>
								<input type="text" class="form-control" name="author">
							</div>
							<br />
							<div class="input-group">
								<span class="input-group-addon">Editora </span>
								<input type="text" class="form-control" name="company">
				    		</div>
				    		<br />
							<div class="input-group">
								<span class="input-group-addon">Ano de lançamento </span>
								<input type="text" class="form-control" name="launchDate">
				    		</div>
				    		<br />
							<div class="input-group">
								<span class="input-group-addon">Preço (R$) </span>
								<input type="text" class="form-control" name="price">
				    		</div>
				    		<br />
							<div class="input-group">
								<span class="input-group-addon">Está disponivel </span>
								<div class="radio">
									<label>
										<input type="radio" name="isAvaible" id="optionYes" value="1">
										Sim
									</label>
									<label>
										<input type="radio" name="isAvaible" id="optionNo" value="0">
										Não
									</label>
								</div>
							</div>
							<br />
							<div class="input-group">
								<span class="input-group-addon">Quantidade </span>
								<input type="text" class="form-control" name="quantity">
				    		</div>
			    		</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
						<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="updateBook(document.forms[0].id.value)">Salvar</button>
					</div>
				</div>

			</div>
		</div>
    </div>
</body>
</html>