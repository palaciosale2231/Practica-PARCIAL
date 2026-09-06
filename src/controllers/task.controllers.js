import { TaskModel } from "../models/task.model.js";

// GET /api/tasks - Obtener todas las tareas
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET /api/tasks/:id - Obtener tarea por ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// POST /api/tasks - Crear tarea
export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

    // Validaciones
    if (!title || typeof title !== "string" || title.trim() === "" || title.length > 100) {
      return res.status(400).json({ message: "El título es obligatorio y debe tener como máximo 100 caracteres" });
    }
    if (!description || typeof description !== "string" || description.trim() === "" || description.length > 100) {
      return res.status(400).json({ message: "La descripción es obligatoria y debe tener como máximo 100 caracteres" });
    }
    if (isComplete !== undefined && typeof isComplete !== "boolean") {
      return res.status(400).json({ message: "El campo isComplete debe ser de tipo booleano" });
    }

    // Unicidad de título
    const existingTask = await TaskModel.findOne({ where: { title } });
    if (existingTask) {
      return res.status(400).json({ message: "El título de la tarea ya existe" });
    }

    const task = await Task.create({
      title,
      description,
      isComplete: isComplete ?? false,
    });

    return res.status(201).json({
      message: "Tarea creada correctamente",
      task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /api/tasks/:id - Actualizar tarea
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;

    const task = await TaskModel.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Validaciones
    if (!title || typeof title !== "string" || title.trim() === "" || title.length > 100) {
      return res.status(400).json({ message: "El título es obligatorio y debe tener como máximo 100 caracteres" });
    }
    if (!description || typeof description !== "string" || description.trim() === "" || description.length > 100) {
      return res.status(400).json({ message: "La descripción es obligatoria y debe tener como máximo 100 caracteres" });
    }
    if (isComplete !== undefined && typeof isComplete !== "boolean") {
      return res.status(400).json({ message: "El campo isComplete debe ser de tipo booleano" });
    }

    // Verificar unicidad de título al modificar
    if (title !== task.title) {
      const existingTask = await TaskModel.findOne({ where: { title } });
      if (existingTask) {
        return res.status(400).json({ message: "El título ingresado ya está en uso por otra tarea" });
      }
    }

    await task.update({
      title,
      description,
      isComplete: isComplete !== undefined ? isComplete : task.isComplete,
    });

    return res.status(200).json({
      message: "Tarea actualizada correctamente",
      task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// DELETE /api/tasks/:id - Eliminar tarea
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    await task.destroy();

    return res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};