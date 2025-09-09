// isActivePath.js
export function isActivePath(currentPath, href) {
  if (href === "/" && (currentPath === "/" || currentPath === "/index.html")) {
    return true;
  }

  if (currentPath === href) {
    return true;
  }

  if (currentPath.includes(href)) {
    return true;
  }

  return false;
}

// getUserName.js
export function getUserName() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.name || null;
}
