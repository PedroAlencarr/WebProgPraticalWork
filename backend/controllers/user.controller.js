const User = require('../models/user.model')
const bcrypt = require('bcrypt')


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

    const { email, first_name, last_name, password } = req.body
    if (!email || !first_name || !last_name || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'A senha precisa ter pelo menos 8 caracteres!' })
    }

    if (first_name.length < 2) {
        return res.status(400).json({ message: 'O nome precisa ter pelo menos 2 caracteres!' })
    }

    if (last_name.length < 2) {
        return res.status(400).json({ message: 'O sobrenome precisa ter pelo menos 2 caracteres!' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Email inválido!' })
    }

    try {
        // Verificar se o email já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email já está em uso." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            first_name,
            last_name,
            password: hashedPassword
        })

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.userId
        const updates = req.body
        const user = await User.findById(id)

        if (!user) {
            res.status(404).json({ message: 'User not found' })
        }

        if (password && password.length < 8) {
            return res.status(400).json({ message: 'A senha precisa ter pelo menos 8 caracteres!' })
        }
    
        if (first_name && first_name.length < 2) {
            return res.status(400).json({ message: 'O nome precisa ter pelo menos 2 caracteres!' })
        }
    
        if (last_name && last_name.length < 2) {
            return res.status(400).json({ message: 'O sobrenome precisa ter pelo menos 2 caracteres!' })
        }

        if (updates.first_namename) user.first_namename = updates.first_namename;
        if (updates.last_name) user.last_name = updates.last_name;

        // Atualiza e faz hash da senha, se enviada
        if (updates.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(updates.password, salt);
        }

        // Salva as alterações
        await user.save();
    
        const updateUser = await User.findByIdAndUpdate(id, req.body)

        const updatedUser = await User.findById(id)
        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateCurrentUser = async (req, res) => {
    try {
        const id = req.userId
        const updates = req.body
        const user = User.findById(id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        
        if (updates.email) {
            return res.status(400).json({ message: 'Você não pode alterar seu e-mail de cadastro!' })
        }

        if (updates.password && updates.password.length < 8) {
            return res.status(400).json({ message: 'A senha precisa ter pelo menos 8 caracteres!' })
        }

        if (updates.first_name && updates.first_name.length < 2) {
            return res.status(400).json({ message: 'O nome precisa ter pelo menos 2 caracteres!' })
        }

        if (updates.last_name && updates.last_name.length < 2) {
            return res.status(400).json({ message: 'O sobrenome precisa ter pelo menos 2 caracteres!' })
        }

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10)
        }

        const updateUser = await User.findByIdAndUpdate(id, req.body)
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
        const userId = req.userId; // Obtém o ID do usuário da sessão
        const user = await User.findById(userId).select("id"); // Busca o usuário pelo ID
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
    
        res.status(200).json(user); // Retorna os id do usuário autenticado
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
    getCurrentUser,
    updateCurrentUser
}