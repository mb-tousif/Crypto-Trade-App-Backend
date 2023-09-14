export const UserSearchableFields= ["name", "email", "contactNo"];

export const UserFilterAbleFields= ["search", "role", "address"];

export type TUserFilterAbleFields = {
  search?: string | undefined;
  role?: string | undefined;
  address?: string | undefined;
};