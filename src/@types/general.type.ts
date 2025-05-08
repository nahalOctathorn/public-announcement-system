export type Id = {
  id: number;
};

export interface MessageResponse {
  message?: string;
}

export type ItemActionProps = {
  itemName: string;
  action: string;
  id: number;
};
