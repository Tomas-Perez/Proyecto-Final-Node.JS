export const filterProducts = (products, query) => {
  const { q, ...filters } = query;
  let result = products;

  // Búsqueda textual libre
  if (q && q.trim() !== "") {
    const searchTerm = q.toLowerCase();
    result = result.filter(product =>
      Object.values(product).some(value =>
        value?.toString().toLowerCase().includes(searchTerm)
      )
    );
  }

  // Filtros dinámicos por campo
  return result.filter(product => {
    return Object.entries(filters).every(([key, value]) => {
      const lowerKey = key.toLowerCase();

      if (lowerKey.startsWith("min")) {
        const field = lowerKey.slice(3).toLowerCase();
        return typeof product[field] === "number" && product[field] >= parseFloat(value);
      }

      if (lowerKey.startsWith("max")) {
        const field = lowerKey.slice(3).toLowerCase();
        return typeof product[field] === "number" && product[field] <= parseFloat(value);
      }

      // Comparación exacta
      const productValue = product[key];
      if (typeof productValue === "string") {
        return productValue.toLowerCase() === value.toLowerCase();
      }

      return productValue == value;
    });
  });
};
