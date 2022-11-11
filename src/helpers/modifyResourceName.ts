export const modifyResourceName = (name?: string) => {
  if (!name) {
    return '';
  }
  const resourceNameWithCapacity = name.split('-')[2];
  return resourceNameWithCapacity.slice(0, -3);
};
