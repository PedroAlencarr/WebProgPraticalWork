const User = require('../models/user.model')

const getUsers = async (req, res) => { 
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch(error) {
        res.status(500).json({error: error.message})
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch(error) {
        res.status(500).json({error: error.message})
    }
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByIdAndUpdate(id, req.body)

        if (!user) {
            res.status(404).json({ message: 'User not found' })
        }

        const updatedUser = await User.findById(id)
        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
      const id = req.params.id
      const user = await User.findByIdAndDelete(id)
      
      if (!user) {
        res.status(404).json({message: 'User not found'})
      }
      
      res.status(200).json({message: `User ${id} deleted`})
  
    } catch (error) {
      res.status(500).json({error: error.message})
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
  
      // Salva os dados do usuário na sessão
      req.session.userId = user._id;
      res.status(200).json({ message: 'Login realizado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro no login', error });
    }
}

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao fazer logout' });
      }
      res.clearCookie('connect.sid'); // Remove o cookie de sessão
      res.status(200).json({ message: 'Logout realizado com sucesso' });
    });
}

const getCurrentUser = async (req, res) => {
    try {
        console.log('aqui foi')
      const userId = req.userId; // Obtém o ID do usuário da sessão
      console.log('aqui foi 2')
      const user = await User.findById(userId).select("-password"); // Busca o usuário pelo ID
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
  
      res.status(200).json(user); // Retorna os dados do usuário
    } catch (error) {
      console.error("Erro ao buscar usuário autenticado:", error);
      res.status(500).json({ message: "Erro ao buscar usuário autenticado", error: error.message });
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    getCurrentUser
}