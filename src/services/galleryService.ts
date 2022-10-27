import axios from 'axios';

export class GalleryService {
  albumId: string;

  private regex =
    /\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)"/g;

  constructor(albumId: string) {
    this.albumId = albumId;
  }

  async getPhotos() {
    const album = await this.getAlbum();
    return this.extractPhotos(album);
  }

  private async getAlbum() {
    const response = await axios.get(
      `https://photos.app.goo.gl/${this.albumId}`
    );
    return response.data;
  }

  private extractPhotos(content: string) {
    const links = new Set();

    let match;
    // eslint-disable-next-line no-cond-assign
    while ((match = this.regex.exec(content))) {
      links.add(match[1]);
    }

    return Array.from(links);
  }
}
