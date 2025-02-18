export interface Photo {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string | null;
  user: {
    name: string;
  };
  likes: number;
  color: string;
  blur_hash?: string;
}
