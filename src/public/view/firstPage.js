const firstPageContent = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NutriKids</title>
    <link rel="icon" type="image/png" href="./../images/logo.png">
    <link rel="stylesheet" href="../view/css/firstPage.css">
</head>
<body>
    <header id="amarelo">
        <h1 class="lilita-one">NutriKids</h1>
    </header>
    <hr style="width: 100%; border: none; height: 1px; background-color: #FFF;">
    <main>
        <img src="./../images/logo.png">
        <div class="box">
            <form action="/api/login" method="POST">
                <input id="form-input" type="text" name="Apelido" placeholder="Apelido" required>
                <br/>
                <input id="form-button" type="submit" value="Entrar">
            </form>
        </div>
    </main>
    <footer>
        <a href=""><strong>Administradores</strong></a>
    </footer>
</body>
</html>
`;

function firstPage(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.send(firstPageContent);
}

module.exports = firstPage;