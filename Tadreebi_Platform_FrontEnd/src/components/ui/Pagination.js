export const itemRender = (_, type, originalElement) => {
  if (type === "prev") {
    return <a>السابق</a>;
  }
  if (type === "next") {
    return <a>التالي</a>;
  }
  return originalElement;
};
