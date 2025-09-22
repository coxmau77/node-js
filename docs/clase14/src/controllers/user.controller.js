// user.controller.js
import UserService from "../services/user.service.js";

export async function searchUsers(req, res) {
  try {
    const { name, role } = req.query;

    if (!name || !name.trim() || !role || !role.trim()) {
      return res.status(400).json({
        message:
          "Por favor, complete ambos campos (nombre y rol) para realizar la búsqueda.",
      });
    }

    const users = await UserService.searchUsers(req.query);

    if (!users || users.length === 0) {
      let message = "No se encontraron usuarios";
      const criteria = [];
      if (name) criteria.push(`nombre: '${name}'`);
      if (role) criteria.push(`rol: '${role}'`);
      if (criteria.length > 0) {
        message += ` con los criterios: ${criteria.join(" y ")}.`;
      }
      return res.status(404).json({ message });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function registerUser(req, res) {
  try {
    const user = await UserService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const { user, token } = await UserService.loginUser(username, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getProfile(req, res) {
  try {
    // El ID del usuario se obtiene del token decodificado por el middleware
    const userId = req.user.id;
    const user = await UserService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await UserService.getAllUsers();
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay usuarios registrados actualmente." });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateUser(req, res) {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const deletedUser = await UserService.deleteUser(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res
      .status(200)
      .json({ message: "Usuario eliminado exitosamente", user: deletedUser });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
