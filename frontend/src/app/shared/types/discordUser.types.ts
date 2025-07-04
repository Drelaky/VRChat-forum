export interface DiscordUser {
  code?: number;
  accent_color: number;
  avatar: string;
  banner: any;
  banner_color: string;
  discriminator: string;
  email: string;
  flags: number;
  id: string;
  locale: string;
  mfa_enabled: boolean;
  public_flags: number;
  username: string;
  verified: boolean;
}
