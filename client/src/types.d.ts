type TState = {
  mode: TTheme,
  user: TUser | null,
  token: string | null,
  reviews: TReview[]
}

type TTheme = 'light' | 'dark';

type TUser = {
  firstName: string,
  lastName: string,
}

type TReview = {
  id: number;
}

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