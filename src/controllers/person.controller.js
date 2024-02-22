import * as personServices from "../services/person.service.js";

//controlador personas
export const getPersonasInfo = async (req, res) => {
  try {
    console.log("controlador");
    const result = await personServices.getPersonasInfo();
    res.status(200).json({
      message: "Personas retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.error('Error en getPersonasInfo:', err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
