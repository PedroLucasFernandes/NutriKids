const loginAdminContent = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NutriKids - Admins</title>
    <link rel="icon" type="image/png" href="./../images/logo.png">
    <link rel="stylesheet" href="../view/admins/css/loginAdmin.css">
</head>
<body>
    <header id="vermelho">
        <h1 class="lilita-one">NutriKids</h1>
    </header>
    <main>
        <img src="./../images/logo.png">
        <div class="box">
        <h1 class="nunito">Setor Administrativo</h1>
        <form action="/api/login" method="POST">
            <input class="form-input" type="text" name="usuario" placeholder="Usuário" required>
            <br/>
            <input class="form-input" id="senha-input" type="senha" name="senha" placeholder="Senha" required>
            <br/>
            <input id="form-button" type="submit" value="Entrar">
        </form>
        </div>
    </main>
    <footer>
        <a href="/"><strong>Usuários</strong></a>
    </footer>
</body>
</html>
`;

function loginAdmin(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.send(loginAdminContent);
}

module.exports = loginAdmin;