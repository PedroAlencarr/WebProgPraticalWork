# **Day Task**  

- Link do projeto no GitHub: https://github.com/PedroAlencarr/WebProgPraticalWork
- Link do site no frontend: https://web-prog-pratical-work-taupe.vercel.app
- Link da API do backend: https://webprogpraticalwork-backend.onrender.com/

Uma aplicação de Kanban colaborativa, simples e eficiente para gerenciamento de tarefas.  

---

## **Descrição**  
O **Day Task** permite que os usuários organizem suas tarefas em boards com status como *To Do*, *Doing*, *Done* e *Rejected*. O proprietário do board pode colaborar com outros usuários compartilhando o board via e-mail.  

---

## **Funcionalidades**  

- **Autenticação**:  
  - Cadastro de usuários.  
  - Login e logout seguros.  

- **Boards e Cards**:  
  - Criação e gerenciamento de boards.  
  - Adição de cards a boards com status definidos (*To Do*, *Doing*, *Done* e *Rejected*).  
  - Compartilhamento de boards com outros usuários por e-mail.  

---

## **Tecnologias Utilizadas**  

### **Frontend**  
- **Framework**: React (hospedado na [Vercel](https://vercel.com)).  
- **Estilização**: SCSS e Emotion.  
- **Gerenciamento de Estado**: Context API.  

### **Backend**  
- **Linguagem**: Node.js.  
- **Framework**: Express.js.  
- **Banco de Dados**: MongoDB (armazenamento na nuvem).  
- **Hospedagem**: Render.  

### **Outras Bibliotecas/Recursos**  
- Express session para autenticação.  
- Mongoose para integração com o MongoDB.  
- Vite.js para o build do frontend.
- MUI - biblioteca de componentes do frontend.
- Formik para formulários.

---

## **Colaboradores**  

A equipe responsável pelo desenvolvimento deste projeto:  

- **Maria Eduarda Betman**  
- **Pedro Henrique Alencar Ramos**  
- **Rafael Ribeiro de Lima**  
- **Rodrigo Ciuffo**  

---  

## **Estrutura do Projeto**  

```plaintext
Day-Task/
├── backend/
│   ├── config/
│   │   └── auth.js              # Configurações de autenticação
│   ├── controllers/             # Lógica de controle do backend
│   │   ├── board.controller.js
│   │   ├── card.controller.js
│   │   └── user.controller.js
│   ├── middlewares/             # Middlewares customizados
│   ├── models/                  # Schemas do MongoDB
│   │   ├── board.model.js
│   │   ├── card.model.js
│   │   └── user.model.js
│   ├── routes/                  # Rotas da API
│   │   ├── board.routes.js
│   │   ├── card.routes.js
│   │   └── user.routes.js
│   ├── .env                     # Variáveis de ambiente
│   ├── index.js                 # Arquivo principal do backend
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   │   ├── assets/              # Imagens e outros arquivos estáticos
│   │   │   ├── images/
│   │   │   └── styles/
│   │   ├── components/          # Componentes reutilizáveis
│   │   │   ├── CustomButton/
│   │   │   ├── Footer/
│   │   │   ├── Header/
│   │   │   ├── Loading/
│   │   │   ├── ProtectedRoute/
│   │   │   └── PublicRoute/
│   │   ├── context/             # Gerenciamento de estado com Context API
│   │   │   └── AuthContext.jsx
│   │   ├── pages/               # Páginas do aplicativo
│   │   │   ├── Home/
│   │   │   ├── Login/
│   │   │   ├── Profile/
│   │   │   ├── ProjectDetails/
│   │   │   ├── Register/
│   │   │   └── TaskCreation/
│   │   ├── App.jsx              # Arquivo principal do React
│   │   ├── main.jsx             # Ponto de entrada do React
│   │   ├── index.html
│   │   ├── vite.config.js       # Configuração do Vite
│   │   └── package.json
├── .gitignore
└── README.md                    # Documentação do projeto
