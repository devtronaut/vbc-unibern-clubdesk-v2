class MapsLinkTransformer{
  transformPlusCode = (plusCode: string): string => {
    return `https://google.com/maps/dir//${encodeURIComponent(plusCode)}`;
  }
}

export default new MapsLinkTransformer();