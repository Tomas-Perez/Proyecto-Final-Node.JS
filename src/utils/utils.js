// Validar que un producto sea valido para PUT (reemplazo total)
export const validatePutProduct = (newData, originalProduct) => {
  const errors = [];

  if (!newData || typeof newData !== "object" || Object.keys(newData).length === 0) {
    errors.push("El cuerpo de la solicitud no puede estar vacío.");
    return errors;
  }

  const originalKeys = Object.keys(originalProduct).sort();
  const newKeys = Object.keys(newData).sort();

  // Verificar que tenga los mismos campos exactamente
  const sameStructure =
    originalKeys.length === newKeys.length &&
    originalKeys.every((key, i) => key === newKeys[i]);

  if (!sameStructure) {
    errors.push(
      `El cuerpo debe incluir exactamente los siguientes campos: ${originalKeys.join(", ")}`
    );
  }

  // No permitir campos undefined
  const undefinedFields = Object.entries(newData).filter(([_, value]) => value === undefined);
  if (undefinedFields.length > 0) {
    errors.push(`Los siguientes campos no pueden ser undefined: ${undefinedFields.map(([k]) => k).join(", ")}`);
  }

  return errors;
};

// Validar que un producto tenga campos validos para PATCH (actualización parcial)
export const validatePatchProduct = (data) => {
  const errors = [];

  if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
    errors.push("Debes enviar al menos un campo para actualizar.");
    return errors;
  }

  // No permitir campos undefined
  const undefinedFields = Object.entries(data).filter(([_, value]) => value === undefined);
  if (undefinedFields.length > 0) {
    errors.push(`Los siguientes campos no pueden ser undefined: ${undefinedFields.map(([k]) => k).join(", ")}`);
  }

  return errors;
};


export const validateDynamicProduct = (data, {
  requireAll = false,
  requiredFields = [],
  fieldTypes = {}
} = {}) => {
  const errors = [];

  if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
    errors.push("El cuerpo de la solicitud no puede estar vacío.");
    return errors;
  }

  const undefinedFields = Object.entries(data).filter(([_, value]) => value === undefined);
  if (undefinedFields.length > 0) {
    errors.push(`Campos con valor undefined: ${undefinedFields.map(([k]) => k).join(", ")}`);
  }

  if (requireAll) {
    requiredFields.forEach(field => {
      if (!(field in data)) {
        errors.push(`El campo '${field}' es obligatorio.`);
      }
    });
  }

  // Validar tipos si se pasan
  for (const [field, expectedType] of Object.entries(fieldTypes)) {
    if (data[field] !== undefined && typeof data[field] !== expectedType) {
      errors.push(`El campo '${field}' debe ser de tipo ${expectedType}.`);
    }
  }

  return errors;
}
