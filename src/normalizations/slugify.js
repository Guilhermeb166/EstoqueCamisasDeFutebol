export const slugify = (text) => 
    text
        .toLowerCase()          // Converte para letras minúsculas
        .trim()                 // Remove espaços no início e no final
        .replace(/\s+/g, '-')   // Substitui espaços por hífens
        .replace(/[^a-z0-9áéíóúâêîôûãõçàèìòùäëïöüñ-]/gi, ''); // Remove caracteres inválidos