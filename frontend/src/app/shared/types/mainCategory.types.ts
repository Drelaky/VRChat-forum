export type MainCategory = {
  title: string;
  description: string;
  id: string;
  url: string;
  altCategory: AltCategory[];
};

export type AltCategory = {
  title: string;
  url: string;
  id: string;
  description: string;
};
