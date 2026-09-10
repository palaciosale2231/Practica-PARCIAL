/*acá como hice las relaciones en un index importo desde el archivo index.js
para que entienda que ahí estan las relaciones y en el modelo persona solo estan las propiedades 
y solo tomaría eso sin entender la relacion
*/
import { PersonModel } from "../models/index.js";

// GET /api/persons - Obtener todas las personas
export const getAllPersons = async (req, res) => {
  try {
    const persons = await PersonModel.findAll();
    return res.status(200).json(persons);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET /api/persons/:id - Obtener una persona por ID
export const getPersonById = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await PersonModel.findByPk(id);

    if (!person) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    return res.status(200).json(person);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// POST /api/persons - Crear persona
export const createPerson = async (req, res) => {
  try {
    const { name, lastname } = req.body;

    // Validaciones
    if (
      !name ||
      typeof name !== "string" ||
      name.trim() === "" ||
      name.length > 100
    ) {
      return res.status(400).json({
        message:
          "El nombre es obligatorio y debe tener como máximo 100 caracteres",
      });
    }

    if (
      !lastname ||
      typeof lastname !== "string" ||
      lastname.trim() === "" ||
      lastname.length > 100
    ) {
      return res.status(400).json({
        message:
          "El apellido es obligatorio y debe tener como máximo 100 caracteres",
      });
    }

    // Validación de unicidad de apellido (Si dejaste unique: true en tu modelo)
    const existingPerson = await PersonModel.findOne({ where: { lastname } });
    if (existingPerson) {
      return res
        .status(400)
        .json({ message: "El apellido ya está registrado" });
    }

    const person = await PersonModel.create({ name, lastname });

    return res.status(201).json({
      message: "Persona creada correctamente",
      person,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /api/persons/:id - Actualizar persona
export const updatePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname } = req.body;

    const person = await PersonModel.findByPk(id);
    if (!person) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    // Validaciones
    if (
      !name ||
      typeof name !== "string" ||
      name.trim() === "" ||
      name.length > 100
    ) {
      return res.status(400).json({
        message:
          "El nombre es obligatorio y debe tener como máximo 100 caracteres",
      });
    }

    if (
      !lastname ||
      typeof lastname !== "string" ||
      lastname.trim() === "" ||
      lastname.length > 100
    ) {
      return res.status(400).json({
        message:
          "El apellido es obligatorio y debe tener como máximo 100 caracteres",
      });
    }

    // Verificar unicidad de apellido al modificar
    if (lastname !== person.lastname) {
      const existingPerson = await PersonModel.findOne({ where: { lastname } });
      if (existingPerson) {
        return res
          .status(400)
          .json({ message: "El apellido ya pertenece a otra persona" });
      }
    }

    await person.update({ name, lastname });

    return res.status(200).json({
      message: "Persona actualizada correctamente",
      person,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// DELETE /api/persons/:id - Eliminar persona
export const deletePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await PersonModel.findByPk(id);

    if (!person) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    await person.destroy();

    return res.status(200).json({ message: "Persona eliminada correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
