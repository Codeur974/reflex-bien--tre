const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

const ABSOLUTE_URL_REGEX = /^(https?:)?\/\//i;
const VIDEO_EXTENSION_REGEX = /\.(mp4|webm|ogg|mov)$/i;

export const resolveMediaUrl = (path?: string) => {
  if (!path) return "";
  if (ABSOLUTE_URL_REGEX.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${backendUrl}${normalizedPath}`;
};

export const isVideoAsset = (path?: string) =>
  !!path && VIDEO_EXTENSION_REGEX.test(path);
