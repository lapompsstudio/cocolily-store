// Main API response type
export interface APIResponse {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    events: Event[];
  };
}

// Event type
export interface Event {
  id: number;
  documentId: string;
  eventName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  location: string;
  date: string;
  description: string;
  file: MediaFile;
  logo: MediaFile;
  images: MediaFile[];
  buttons: Button[];
}

// Media file type for images, logos, etc.
export interface MediaFile {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    // Could have other formats like medium, large, etc.
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Image format type
export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

// Button type
export interface Button {
  id: number;
  label: string;
}
