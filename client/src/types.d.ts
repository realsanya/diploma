type TState = {
  mode: TTheme,
  user: TUser | null,
  token: string | null,
  currentReview: TReview | null;
}

type TTheme = 'light' | 'dark';

type TUser = {
  firstName: string,
  lastName: string,
}

type TReview = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  fileStorageName: string;
};

type TRouteItemConfig = {
  title?: string;
  path?: string;
  href?: string;
  isPrivate?: boolean;
  roleAccess?: EUserProfileRole[]
  exact?: boolean;
  index?: boolean;
  component: ComponentType;
  children?: Record<string, TRouteItemConfig>;
  redirect?: string;
  isNativeLink?: boolean,
};

type TEnumString = { [n: string]: string };