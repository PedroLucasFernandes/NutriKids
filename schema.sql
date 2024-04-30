-- Certifique-se de inserir os comandos na ordem correta, para não alterar o resultado final

-- Criar Banco de Dados
CREATE DATABASE <nomeDoBanco>;

-- Acesse este Banco
\c <nomeDoBanco>

-- Inserindo a tabela de Administrador
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    login VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER,
    updated_by INTEGER,
    CONSTRAINT check_created_by CHECK (created_by > 0),
    CONSTRAINT check_updated_by CHECK (updated_by > 0)
);

-- Inserindo a tabela de História
CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    story TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL,
    updated_by INTEGER NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    FOREIGN KEY (created_by) REFERENCES admin(id) ON DELETE CASCADE,
    FOREIGN KEY (updated_by) REFERENCES admin(id) ON DELETE CASCADE
);

-- Inserindo a tabela de Quadrinho
CREATE TABLE comic (
    id SERIAL PRIMARY KEY,
    id_history INTEGER NOT NULL,
    comic_order INTEGER NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    CONSTRAINT comic_comic_order_check CHECK (comic_order > 0),
    FOREIGN KEY (id_history) REFERENCES history(id) ON DELETE CASCADE
);

-- Inserindo a tabela de Quiz
CREATE TABLE quiz (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL,
    updated_by INTEGER NOT NULL,
    FOREIGN KEY (created_by) REFERENCES admin(id) ON DELETE CASCADE,
    FOREIGN KEY (updated_by) REFERENCES admin(id) ON DELETE CASCADE
);

-- Inserindo a tabela de Questão
CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    id_quiz INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    option_1 VARCHAR(255) NOT NULL,
    option_2 VARCHAR(255) NOT NULL,
    option_3 VARCHAR(255) NOT NULL,
    option_4 VARCHAR(255) NOT NULL,
    answer INTEGER NOT NULL,
    explanation TEXT NOT NULL,
    CONSTRAINT question_answer_check CHECK (answer >= 1 AND answer <= 4),
    FOREIGN KEY (id_quiz) REFERENCES quiz(id) ON DELETE CASCADE
);

-- Inserindo a tabela de Receita
CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    yield VARCHAR(50) NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL,
    updated_by INTEGER NOT NULL,
    FOREIGN KEY (created_by) REFERENCES admin(id) ON DELETE CASCADE,
    FOREIGN KEY (updated_by) REFERENCES admin(id) ON DELETE CASCADE
);

-- Inserindo a tabela de Jogo
CREATE TABLE game (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    image_path VARCHAR(255) NOT NULL
);
