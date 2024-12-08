const isAuthenticated = (req, res, next) => {
  try {
    const userId = req.session.userId; // Obtém o ID do usuário da sessão

    if (!userId) {
      console.log('usuário não autenticado')
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    req.userId = userId; // Armazena o ID do usuário no objeto `req` para uso nas rotas
    next(); // Continua para o próximo middleware ou controlador
  } catch (err) {
    console.error("Erro na verificação de autenticação:", err);
    res.status(500).json({ message: "Erro interno na autenticação" });
  }
};


module.exports = isAuthenticated
