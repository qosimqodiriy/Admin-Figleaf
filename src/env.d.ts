interface ImportMeta {
  env: {
    GITHUB_AUTH_TOKEN: string;
    NODE_ENV: 'development' | 'production';
    PORT?: string;
    PWD: string;
    BASE_URL: string,
    VITE_BASE_URL: string,
    VITE_BASE_IMAGE_URL: string,
  };
}


declare module '@/store';