// Validar que un producto sea valido para PUT (reemplazo total)
export const validatePutProduct = (data) => {
  const errors = [];

  if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
    errors.push("El campo 'name' es obligatorio y debe ser un string no vacío.");
  }

  if (data.price === undefined || typeof data.price !== "number" || data.price < 0) {
    errors.push("El campo 'price' es obligatorio y debe ser un número mayor o igual a 0.");
  }

  return errors;
}

// Validar que un producto tenga campos validos para PATCH (actualización parcial)
export const validatePatchProduct = (data) => {
  const validFields = ["name", "price"];
  const keys = Object.keys(data);
  const errors = [];

  if (keys.length === 0) {
    errors.push("Debes enviar al menos un campo para actualizar.");
    return errors;
  }

  const invalidFields = keys.filter(k => !validFields.includes(k));
  if (invalidFields.length > 0) {
    errors.push(`Campos inválidos: ${invalidFields.join(", ")}`);
  }

  if (data.name !== undefined && (typeof data.name !== "string" || data.name.trim() === "")) {
    errors.push("El campo 'name' debe ser un string no vacío.");
  }

  if (data.price !== undefined && (typeof data.price !== "number" || data.price < 0)) {
    errors.push("El campo 'price' debe ser un número mayor o igual a 0.");
  }

  return errors;
}

export const validatePostProduct = (data) => {

}

