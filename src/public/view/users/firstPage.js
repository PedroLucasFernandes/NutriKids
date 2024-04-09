const firstPageContent = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NutriKids</title>
    <link rel="icon" type="image/png" href="./../images/logo.png">
    <link rel="stylesheet" href="../view/users/css/firstPage.css">
</head>
<body>
    <header id="amarelo">
        <h1 class="lilita-one">NutriKids</h1>
    </header>
    <hr style="width: 100%; border: none; height: 1px; background-color: #FFF;">
    <main>
        <img src="./../images/logo.png">
        <div class="box">
            <form class="form" action="/api/login" method="POST">
                <input id="form-input" type="text" name="apelido" placeholder="Apelido" required>
                <br/>
                <input id="form-button" type="submit" value="Entrar">
            </form>
        </div>
    </main>
    <footer>
        <a href="/admin"><strong>Administradores</strong></a>
    </footer>
</body>
<script>
    const form = document.querySelector('.form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = form.apelido.value;
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if(data.error) {
            alert(data.error);
            document.cookie = '';
        } else {
            window.location.href = '/inicio';
        }
    });
</script>
</html>
`;

function firstPage(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.send(firstPageContent);
}

module.exports = firstPage;