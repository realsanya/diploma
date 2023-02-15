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