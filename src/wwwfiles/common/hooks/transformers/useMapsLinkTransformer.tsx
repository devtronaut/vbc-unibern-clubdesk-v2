export const useMapsLinkTransformer = (plusCode: string): string => {
  return `https://www.google.com/maps/dir//${encodeURIComponent(plusCode)}`;
};