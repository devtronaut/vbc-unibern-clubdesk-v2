class MapsLinkTransformer{
  transformPlusCode = (plusCode: string): string => {
    return `https://www.google.com/maps/dir//${encodeURIComponent(plusCode)}`;
  }
}

export default new MapsLinkTransformer();