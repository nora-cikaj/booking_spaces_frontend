export const modifyResourceName = (resource?: string) => {
  if (!resource) {
    return resource;
  }
  return resource.slice(16).slice(0, -4);
};
