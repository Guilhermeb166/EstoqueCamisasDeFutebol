export function formatName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export const formatTeamName = (name) => {
    if (!name) return "";
    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };