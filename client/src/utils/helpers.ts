import { Tag } from '../models';

export const defaultTag = (): Tag => {
  return { tagId: '', musicId: '', title: '', platform: 'spotify' };
};

export const convertSpotifyLinkToURI = (link: string): string => {
  try {
    const indexes = link.split("spotify.com/")[1].split("/");
    return `spotify:${indexes[0]}:${indexes[1].split("?")[0]}`;
  } catch (e) {
    console.error(e);
    return "";
  }
};