import { UserModel } from "../models/user.model.js";

// GET /api/users - Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET /api/users/:id - Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// POST /api/users - Crear usuario
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validaciones
    if (
      !name ||
      typeof name !== "string" ||
      name.trim() === "" ||
      name.length > 100
    ) {
      return res
        .status(400)
        .json({
          message:
            "El nombre es obligatorio y debe tener como máximo 100 caracteres",
        });
    }
    if (
      !email ||
      typeof email !== "string" ||
      email.trim() === "" ||
      email.length > 100
    ) {
      return res
        .status(400)
        .json({
          message:
            "El email es obligatorio y debe tener como máximo 100 caracteres",
        });
    }
    if (
      !password ||
      typeof password !== "string" ||
      password.trim() === "" ||
      password.length > 100
    ) {
      return res
        .status(400)
        .json({
          message:
            "La contraseña es obligatoria y debe tener como máximo 100 caracteres",
        });
    }

    // Unicidad de email
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const user = await UserModel.create({ name, email, password });

    return res.status(201).json({
      message: "Usuario creado correctamente",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /api/users/:id - Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Validaciones
    if (
      !name ||
      typeof name !== "string" ||
      name.trim() === "" ||
      name.length > 100
    ) {
      return res
        .status(400)
        .json({
          message:
            "El nombre es obligatorio y debe tener como máximo 100 caracteres",
        });
    }
    if (
      !email ||
      typeof email !== "string" ||
      email.trim() === "" ||
      email.length > 100
    ) {
      return res
        .status(400)
        .json({
          message:
            "El email es obligatorio y debe tener como máximo 100 caracteres",
        });
    }
    if (
      !password ||
      typeof password !== "string" ||
      password.trim() === "" ||
      password.length > 100
    ) {
      return res
        .status(400)
        .json({
          message:
            "La contraseña es obligatoria y debe tener como máximo 100 caracteres",
        });
    }

    // Verificar unicidad de email al modificar
    if (email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "El email ya pertenece a otro usuario" });
      }
    }

    await user.update({ name, email, password });

    return res.status(200).json({
      message: "Usuario actualizado correctamente",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// DELETE /api/users/:id - Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.destroy();

    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
