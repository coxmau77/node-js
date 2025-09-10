// ¿Qué es un service en Node?
// Es una capa intermedia entre el controlador (user.controller.js) y el modelo/repositorio (user.model.js o acceso a BD).
// Su objetivo es contener la lógica de negocio de los usuarios.
// Hace que los controladores se mantengan “limpios” (solo reciben requests/responses) y los modelos solo se encarguen de datos.
// user.service.js
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

class UserService {
  async registerUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({ ...userData, password: hashedPassword });
    return newUser.save();
  }

  async loginUser(username, password) {
    const user = await User.findOne({ username });
    if (!user) throw new Error("Usuario no encontrado");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Credenciales inválidas");

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    return { user, token };
  }

  async getAllUsers() {
    return User.find();
  }

  async getUserById(userId) {
    return User.findById(userId);
  }

  async updateUser(userId, updateData) {
    return User.findByIdAndUpdate(userId, updateData, { new: true });
  }

  async deleteUser(userId) {
    return User.findByIdAndDelete(userId);
  }
}

export default new UserService();
