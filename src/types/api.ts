export type HeroSliderResponse = {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    events: {
      id: number;
      documentId: string;
      eventName: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      file: {
        id: number;
        documentId: string;
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number | null;
        height: number | null;
        formats: {
          thumbnail?: {
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
          };
          small?: {
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
          };
        } | null;
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
      };
      logo: {
        id: number;
        documentId: string;
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number | null;
        height: number | null;
        formats: {
          thumbnail?: {
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
          };
          small?: {
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
          };
        } | null;
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
      };
    }[];
  };
  meta: Record<string, unknown>;
};
