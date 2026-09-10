/* Importamos desde el index.js para mantener la arquitectura de relaciones centralizadas,
lo mismo que con person.model
*/
import { RoleModel } from "../models/index.js";

// GET /api/roles - Obtener todos los roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.findAll();
    return res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET /api/roles/:id - Obtener un rol por ID
export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await RoleModel.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    return res.status(200).json(role);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// POST /api/roles - Crear rol
export const createRole = async (req, res) => {
  try {
    const { rolename } = req.body;

    // Validación de rolename
    if (
      !rolename ||
      typeof rolename !== "string" ||
      rolename.trim() === "" ||
      rolename.length > 100
    ) {
      return res.status(400).json({
        message:
          "El nombre del rol (rolename) es obligatorio y debe tener como máximo 100 caracteres",
      });
    }

    // Unicidad del rolename (evitar roles duplicados como 'ADMIN')
    const existingRole = await RoleModel.findOne({ where: { rolename } });
    if (existingRole) {
      return res.status(400).json({ message: "El rol ya está registrado" });
    }

    const role = await RoleModel.create({ rolename });

    return res.status(201).json({
      message: "Rol creado correctamente",
      role,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /api/roles/:id - Actualizar rol
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { rolename } = req.body;

    const role = await RoleModel.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    // Validación de rolename
    if (
      !rolename ||
      typeof rolename !== "string" ||
      rolename.trim() === "" ||
      rolename.length > 100
    ) {
      return res.status(400).json({
        message:
          "El nombre del rol (rolename) es obligatorio y debe tener como máximo 100 caracteres",
      });
    }

    // Verificar unicidad del rolename al modificar
    if (rolename !== role.rolename) {
      const existingRole = await RoleModel.findOne({ where: { rolename } });
      if (existingRole) {
        return res
          .status(400)
          .json({ message: "Ya existe otro rol con este nombre" });
      }
    }

    await role.update({ rolename });

    return res.status(200).json({
      message: "Rol actualizado correctamente",
      role,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// DELETE /api/roles/:id - Eliminar rol
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await RoleModel.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    await role.destroy();

    return res.status(200).json({ message: "Rol eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
