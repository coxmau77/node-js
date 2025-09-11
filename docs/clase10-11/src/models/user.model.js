// user.model.js
import { Schema, model } from "mongoose";

// Definimos los roles de forma clara y centralizada
const ROLES = ["user", "admin", "moderator", "editor"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    birthdate: {
      type: Date,
      required: false, // Hacemos la fecha de nacimiento opcional
    },
    username: {
      type: String,
      required: false, // Hacemos el nombre de usuario opcional, priorizando el email
      unique: true,
      sparse: true, // Permite que haya varios documentos sin 'username'
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ROLES, // Restringe los valores a los definidos en el array ROLES
      default: "user", // Asigna un rol por defecto
      required: true, // Hace que el rol sea un campo obligatorio
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Nombre explícito de la colección, como en el segundo modelo
const User = model("User", userSchema, "UsuariosApp");

export default User;
